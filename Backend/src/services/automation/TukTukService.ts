import * as anchor from "@coral-xyz/anchor";
import {AnchorProvider} from "@coral-xyz/anchor";
import {
  Commitment,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionInstruction
} from "@solana/web3.js";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import {compileTransaction} from "@helium/tuktuk-sdk";
import {cronJobTransactionKey, getCronJobForName, init as initCron} from "@helium/cron-sdk";
import {
  clientAddress,
  NetworkState,
  OraoCb,
  requestAccountAddress
} from "@orao-network/solana-vrf-cb";
import logger from "../../utils/logger";

/**
 * TukTuk configuration from tuktuk-config.json
 */
interface TukTukConfig {
  rpcUrl: string;
  programId: string;
  idlPath: string;
  cronJobName: string;
  numberOfRandomnessAccounts: number;
  skipPreflight: boolean;
  commitment?: Commitment;
}

export class TukTukService {
  private provider?: AnchorProvider;
  private payerKeypair?: Keypair;
  private config?: TukTukConfig;
  private program?: anchor.Program;
  private idl?: any;
  private configPath: string;

  constructor() {
    this.configPath = process.env.TUKTUK_CONFIG_PATH  || './src/config/tuktuk-config.json';
  }

  private loadConfig(): TukTukConfig {
    const fullPath = path.isAbsolute(this.configPath)
      ? this.configPath
      : path.resolve(process.cwd(), this.configPath);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`TukTuk config file not found at ${fullPath}`);
    }

    try {
      const raw = fs.readFileSync(fullPath, "utf8");
      const config = JSON.parse(raw) as TukTukConfig;

      logger.info(`Loaded TukTuk config from ${fullPath}`);
      return config;
    } catch (err) {
      logger.error(`Failed to read/parse TukTuk config at ${fullPath}`, err);
      throw err;
    }
  }

  /**
   * Create provider and program
   */
  private async ensureInitialized() {
    if (!this.config) {
      this.config = this.loadConfig();
    }

    if (!this.idl) {
      const idlPath = path.isAbsolute(this.config.idlPath)
        ? this.config.idlPath
        : path.resolve(process.cwd(), this.config.idlPath);

      if (!fs.existsSync(idlPath)) {
        throw new Error(`IDL file not found at ${idlPath}`);
      }

      this.idl = JSON.parse(fs.readFileSync(idlPath, "utf8"));
      logger.info(`Loaded IDL from ${idlPath}`);
    }

    if (!this.provider) {
      const envSecretKey = process.env.SOLANA_PAYER_SECRET_KEY;

      if (!envSecretKey) {
        throw new Error('SOLANA_PAYER_SECRET_KEY not found in environment variables');
      }

      let secretKeyArray: number[];
      try {
        secretKeyArray = JSON.parse(envSecretKey);
        logger.info('Loaded payer keypair from environment variable');
      } catch (err) {
        throw new Error('Invalid SOLANA_PAYER_SECRET_KEY format in .env. Expected JSON array of numbers');
      }

      this.payerKeypair = Keypair.fromSecretKey(Uint8Array.from(secretKeyArray));

      const connection = new Connection(
        this.config.rpcUrl,
        this.config.commitment || "confirmed"
      );

      this.provider = new AnchorProvider(
        connection,
        new anchor.Wallet(this.payerKeypair),
        {
          preflightCommitment: "confirmed",
          skipPreflight: this.config.skipPreflight,
        }
      );

      anchor.setProvider(this.provider);
      logger.info(`Created TukTuk provider for ${this.config.rpcUrl}`);
    }

    if (!this.program) {
      const programId = new PublicKey(this.config.programId);
      this.program = new anchor.Program(this.idl, this.provider!);
      logger.info(`Created TukTuk program instance for ${programId.toBase58()}`);
    }
  }

  /**
   * Updates cron transaction with new requestAccountAddress
   */
  public async updateCronJobAfterRequestsCompleted() {
    await this.ensureInitialized();

    const programId = new PublicKey(this.config!.programId);
    const numberOfRandomnessAccounts = this.config!.numberOfRandomnessAccounts;
    const cronJobName = this.config!.cronJobName;
    const skipPreflight = this.config!.skipPreflight;

    logger.info(`Updating cron job "${cronJobName}" with ${numberOfRandomnessAccounts} randomness accounts`);

    // --- PDA calculation ---
    const [raffleStatePDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("raffle_state")],
      programId
    );
    const [solRafflePDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("sol_raffle")],
      programId
    );
    const [vrfFeeVaultPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("vrf_fee_vault")],
      programId
    );
    const [clientStatePDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("CLIENT_STATE")],
      programId
    );

    // --- ORAO client & network state ---
    const [clientPDA] = clientAddress(programId, clientStatePDA);
    const vrf = new OraoCb(this.provider!);
    const networkState = await vrf.getNetworkState();
    const treasuryPubkey = networkState.config.treasury;

    logger.info(`VRF treasury: ${treasuryPubkey.toBase58()}`);

    // --- Creating randomness accounts/seeds ---
    const seeds: Buffer[] = [];
    const randomnessAccounts: { pubkey: PublicKey; isWritable: boolean; isSigner: boolean }[] = [];

    for (let i = 0; i < numberOfRandomnessAccounts; i++) {
      const seed = crypto.randomBytes(32);
      seeds.push(seed);
      const [requestPDA] = requestAccountAddress(clientPDA, seed);
      randomnessAccounts.push({
        pubkey: requestPDA,
        isWritable: true,
        isSigner: false
      });
    }

    const seedsForRpc: number[][] = seeds.map(s => this.buf32ToNumberArray(s));

    // --- Creating instruction ---
    let performTaskIx: TransactionInstruction;
    try {
      performTaskIx = await this.program!.methods
        .requestRandomness(seedsForRpc)
        .accounts({
          raffleState: raffleStatePDA,
          solRaffle: solRafflePDA,
          vrfFeeVault: vrfFeeVaultPDA,
          vrf: vrf.programId,
          clientState: clientStatePDA,
          client: clientPDA,
          networkState: NetworkState.createAddress(networkState.bump)[0],
          treasury: treasuryPubkey,
          systemProgram: SystemProgram.programId,
        })
        .remainingAccounts(randomnessAccounts.map(a => ({
          pubkey: a.pubkey,
          isWritable: a.isWritable,
          isSigner: a.isSigner
        })))
        .instruction();

      logger.info("Instruction created successfully");
    } catch (err: any) {
      logger.error(`Error creating instruction: ${err?.message ?? err}`);
      throw new Error(`Error creating instruction: ${err?.message ?? err}`);
    }

    // --- Compiling transaction ---
    const { transaction, remainingAccounts } = compileTransaction([performTaskIx], []);
    logger.info("Transaction compiled successfully");

    const cronProgram = await initCron(this.provider!);
    const cronJob = await getCronJobForName(cronProgram, cronJobName);

    if (!cronJob) {
      throw new Error(`Cron job named "${cronJobName}" not found`);
    }

    logger.info(`Found cron job: ${cronJob.toBase58()}`);

    // --- Deleting an existing transaction ---
    try {
      await cronProgram.methods
        .removeCronTransactionV0({ index: 0 })
        .accounts({
          rentRefund: this.payerKeypair!.publicKey,
          cronJobTransaction: cronJobTransactionKey(cronJob, 0)[0],
        })
        .rpc({ skipPreflight });

      logger.info("Removed existing cron transaction");

      await new Promise((r) => setTimeout(r, 1500));
    } catch (e: any) {
      logger.debug("No existing transaction to remove or removal failed (ignored)");
    }

    // --- Adding a new transaction ---
    const addTxSignature = await cronProgram.methods
      .addCronTransactionV0({
        index: 0,
        transactionSource: { compiledV0: [transaction] },
      })
      .accounts({
        payer: this.payerKeypair!.publicKey,
        cronJob: cronJob,
        cronJobTransaction: cronJobTransactionKey(cronJob, 0)[0],
      })
      .remainingAccounts(remainingAccounts)
      .rpc({ skipPreflight });

    logger.info(`Cron transaction added successfully. Signature: ${addTxSignature}`);
  }

  private buf32ToNumberArray(b: Buffer | Uint8Array): number[] {
    if (b.length !== 32) {
      throw new Error("seed must be 32 bytes");
    }
    return Array.from(b);
  }
}
