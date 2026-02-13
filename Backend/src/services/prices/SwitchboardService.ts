import { Connection, PublicKey, Keypair, Transaction } from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { PullFeed, ON_DEMAND_DEVNET_PID } from "@switchboard-xyz/on-demand";
import { CrossbarClient } from "@switchboard-xyz/common";
import * as anchor from "@coral-xyz/anchor";
import fs from "fs";
import path from "path";
import logger from "../../utils/logger";
import { Commitment } from "@solana/web3.js";

/**
 * Switchboard configuration from switchboard-config.json
 */
interface SwitchboardConfig {
  rpcUrl: string;
  solToUsdFeedPubkey: string;
  btcToUsdFeedPubkey: string;
  crossbarUrl: string;
  numSignatures: number;
  skipPreflight: boolean;
  commitment?: Commitment;
  maxRetries?: number;
}

export interface FeedUpdateResult {
  feedName: string;
  success: boolean;
  signature?: string;
  error?: string;
}

export class SwitchboardService {
  private provider?: AnchorProvider;
  private payerKeypair?: Keypair;
  private config?: SwitchboardConfig;
  private sbProgram?: anchor.Program;
  private crossbar?: CrossbarClient;
  private configPath: string;

  constructor() {
    this.configPath = process.env.SWITCHBOARD_CONFIG_PATH || './src/config/switchboard-config.json';
  }

  private loadConfig(): SwitchboardConfig {
    const fullPath = path.isAbsolute(this.configPath)
      ? this.configPath
      : path.resolve(process.cwd(), this.configPath);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Switchboard config file not found at ${fullPath}`);
    }

    try {
      const raw = fs.readFileSync(fullPath, "utf8");
      const config = JSON.parse(raw) as SwitchboardConfig;

      logger.info(`Loaded Switchboard config from ${fullPath}`);
      return config;
    } catch (err) {
      logger.error(`Failed to read/parse Switchboard config at ${fullPath}`, err);
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
        new Wallet(this.payerKeypair),
        {
          preflightCommitment: "confirmed",
          skipPreflight: this.config.skipPreflight,
        }
      );

      anchor.setProvider(this.provider);
      logger.info(`Created Switchboard provider for ${this.config.rpcUrl}`);
    }

    if (!this.sbProgram) {
      this.sbProgram = await anchor.Program.at(
        ON_DEMAND_DEVNET_PID,
        this.provider!
      );
      logger.info(`Created Switchboard program instance for ${ON_DEMAND_DEVNET_PID.toBase58()}`);
    }

    if (!this.crossbar) {
      this.crossbar = new CrossbarClient(this.config.crossbarUrl);
      logger.info(`Created Crossbar client for ${this.config.crossbarUrl}`);
    }
  }

  private async updateFeed(
    feedPubkeyStr: string,
    feedName: string
  ): Promise<string> {
    const feedPubkey = new PublicKey(feedPubkeyStr);
    const maxRetries = this.config!.maxRetries || 5;
    const numSignatures = this.config!.numSignatures;

    logger.info(
      `Updating ${feedName} price feed at ${feedPubkey.toBase58()} with ${numSignatures} signatures`
    );

    const pullFeed = new PullFeed(this.sbProgram!, feedPubkey);

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      logger.info(
        `[Attempt ${attempt}/${maxRetries}] ` +
        `Fetching ${feedName} data with ${numSignatures} signatures...`
      );

      try {
        const [updateIxs, responses, numSuccess] = await pullFeed.fetchUpdateIx({
          numSignatures,
          crossbarClient: this.crossbar!,
        });

        logger.info(
          `Oracle responses: ${numSuccess}/${numSignatures}, ` +
          `Instructions: ${updateIxs?.length || 0}`
        );

        if (responses && responses.length > 0) {
          logger.debug(`Oracle responses detail:`);
          responses.forEach((r, i) => {
            logger.debug(
              `  [${i}] Oracle: ${r.oracle?.toString().slice(0, 8)}... ` +
              `Value: ${r.value?.toString() || 'N/A'}`
            );
          });
        }

        if (!updateIxs || updateIxs.length === 0) {
          throw new Error(`No update instructions for ${feedName}`);
        }

        const tx = new Transaction().add(...updateIxs);

        logger.debug(`Sending transaction to update ${feedName} price feed...`);

        const signature = await this.provider!.sendAndConfirm(tx, [], {
          skipPreflight: this.config!.skipPreflight,
          commitment: 'confirmed',
        });

        logger.info(`${feedName} updated! Signature: ${signature}`);
        return signature;

      } catch (error: any) {
        const errorMsg = error?.message || error?.toString() || 'Unknown error';

        const isNotEnoughSamples =
          errorMsg.includes('6030') ||
          errorMsg.includes('NotEnoughSamples') ||
          errorMsg.includes('0x178e');

        const isTooLarge =
          errorMsg.includes('too large') ||
          errorMsg.includes('Transaction size');

        if (isNotEnoughSamples) {
          logger.warn(
            `[Attempt ${attempt}] Error 6030 NotEnoughSamples - ` +
            `retrying to get different oracle responses...`
          );

          if (attempt === maxRetries) {
            throw new Error(`Oracle consensus could not be reached. Failed after ${maxRetries} attempts: ${errorMsg}`);
          }

          await new Promise(resolve => setTimeout(resolve, 2000 + attempt * 1000));
          continue;
        } else if (isTooLarge) {
          logger.warn(`Transaction too large, retrying [Attempt ${attempt}/${maxRetries}]...`);
          continue;

        } else {
          logger.error(`[Attempt ${attempt}] ${feedName} update failed:`, error);
          throw error;
        }
      }
    }

    throw new Error(`Failed to update ${feedName} after ${maxRetries} attempts`);
  }

  public async updateSolToUsdFeed(): Promise<string> {
    return this.updateFeed(this.config!.solToUsdFeedPubkey, "SOL/USD");
  }

  public async updateBtcToUsdFeed(): Promise<string> {
    return this.updateFeed(this.config!.btcToUsdFeedPubkey, "BTC/USD");
  }

  public async updatePriceFeeds(): Promise<FeedUpdateResult[]> {
    await this.ensureInitialized();

    const results: FeedUpdateResult[] = [];

    // Update SOL feed
    try {
      const solSignature = await this.updateSolToUsdFeed();
      results.push({
        feedName: 'SOL/USD',
        success: true,
        signature: solSignature,
      });
    } catch (error) {
      logger.error('Failed to update SOL/USD feed:', error);
      results.push({
        feedName: 'SOL/USD',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    // Update BTC feed
    try {
      const btcSignature = await this.updateBtcToUsdFeed();
      results.push({
        feedName: 'BTC/USD',
        success: true,
        signature: btcSignature,
      });
    } catch (error) {
      logger.error('Failed to update BTC/USD feed:', error);
      results.push({
        feedName: 'BTC/USD',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    const successCount = results.filter(r => r.success).length;
    logger.info(`Updated ${successCount}/${results.length} feeds successfully`);

    return results;
  }
}
