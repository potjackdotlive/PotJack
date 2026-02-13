import {Connection, Keypair, PublicKey, Transaction, TransactionInstruction} from '@solana/web3.js';
import {
  BigNumberish,
  ContractEventPayload,
  ethers,
  EventLog,
  getBigInt,
  getNumber,
  isError,
} from 'ethers';
import {QueryFailedError, Repository} from 'typeorm';
import {
  AnchorProvider,
  BN,
  BorshEventCoder,
  BorshInstructionCoder,
  Idl, Program,
  Wallet
} from '@coral-xyz/anchor';
import bs58 from 'bs58';
import fs from "fs";
import path from "path";
import {AppDataSource} from '../../config/database';
import {BlockchainSync} from '../../entities/BlockchainSync';
import {FirstTicketBonus} from '../../entities/FirstTicketBonus';
import {TicketPurchase} from '../../entities/TicketPurchase';
import {User} from '../../entities/User';
import {UserRoundStats} from '../../entities/UserRoundStats';
import {WinEvent} from '../../entities/WinEvent';
import logger from '../../utils/logger';
import {NotificationService} from '../notifications/NotificationService';
import {Round} from "../../entities/Round";
import {StatisticsService} from "../statistics/StatisticsService";
import {TukTukService} from "../automation/TukTukService";

// Interface to extend WebSocketProvider with private _websocket property
// Note: _websocket is a private property in ethers.js WebSocketProvider
// We need to access it for connection event handling (open, close, error)
interface WebSocketProviderWithEvents extends ethers.WebSocketProvider {
  _websocket?: {
    on: (event: string, callback: (...args: any[]) => void) => void;
    off: (event: string, callback: (...args: any[]) => void) => void;
  };
}

// ABI fragments for the events we're interested in
const eventABIs = [
  'event TicketPurchased(address indexed token, uint32 indexed roundId, address indexed buyer, uint40 count, uint256 totalAmount, uint256 timestamp)',
  'event FirstTicketBonusAwarded(address indexed token, uint32 indexed roundId, address indexed buyer, uint256 timestamp, uint256 roundStartTime, uint256 roundEndTime)',
  'event WinnerPicked(address indexed token, uint32 indexed roundId, uint256 timestamp)',
];

const contractReadABIs = [
  'function getRoundResult(address token, uint32 roundId) view returns (address winnerAddress, uint256 winnerTicket, address[] roundPlayers, uint256 prizeAmount)',
];

// Interface for blockchain configuration
interface BlockchainConfig {
  rpcUrl: string;
  chainId: number;
  contractAddresses: string[];
  extra?: Record<string, any>;
}

export class BlockchainService {
  private configs: Record<string, BlockchainConfig> = {};
  private providers: Record<string, ethers.JsonRpcApiProvider | Connection> = {};
  private contracts: Record<string, ethers.Contract[]> = {};
  private readContracts: Record<string, ethers.Contract[]> = {};
  private connectionStates: Record<string, boolean> = {};
  private reconnectAttempts: Record<string, number> = {};
  private maxReconnectAttempts = 5;
  private reconnectDelay = 5000; // 5 seconds
  private healthCheckInterval = 30000; // 30 seconds
  private maxBlockRange: number  = 10000;
  private healthCheckTimers: Record<string, NodeJS.Timeout> = {};
  private syncThresholdBlocks = 5; // Default threshold
  private solanaProgramId: Record<string, PublicKey> = {};
  private solanaIdl: Record<string, Idl> = {};
  private solanaAuthorityKeypair?: Keypair;

  // Repository properties
  private userRepository: Repository<User>;
  private winEventRepository: Repository<WinEvent>;
  private ticketPurchaseRepository: Repository<TicketPurchase>;
  private firstTicketBonusRepository: Repository<FirstTicketBonus>;
  private blockchainSyncRepository: Repository<BlockchainSync>;
  private userRoundStatsRepository: Repository<UserRoundStats>;
  private roundRepository: Repository<Round>;
  private notificationService: NotificationService;
  private statisticsService: StatisticsService;
  private tukTukService: TukTukService;

  constructor() {
    // Initialize repositories
    this.userRepository = AppDataSource.getRepository(User);
    this.winEventRepository = AppDataSource.getRepository(WinEvent);
    this.ticketPurchaseRepository = AppDataSource.getRepository(TicketPurchase);
    this.firstTicketBonusRepository = AppDataSource.getRepository(FirstTicketBonus);
    this.blockchainSyncRepository = AppDataSource.getRepository(BlockchainSync);
    this.userRoundStatsRepository = AppDataSource.getRepository(UserRoundStats);
    this.roundRepository = AppDataSource.getRepository(Round);
    this.notificationService = new NotificationService();
    this.statisticsService = new StatisticsService();
    this.tukTukService = new TukTukService();
  }

  private async delay(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  // Check if WebSocket connection is alive
  private async checkConnectionHealth(blockchainName: string): Promise<boolean> {
    logger.debug(`[${blockchainName}] [HEALTH_CHECK] Starting health check...`);

    try {
      const provider = this.providers[blockchainName];
      if (!provider) {
        logger.warn(`[${blockchainName}] [HEALTH_CHECK] ❌ No provider found`);
        return false;
      }

      logger.debug(`[${blockchainName}] [HEALTH_CHECK] Provider type: ${provider.constructor.name}`);

      // For WebSocket providers, try to get the latest block number
      if (provider instanceof ethers.WebSocketProvider) {
        logger.debug(`[${blockchainName}] [HEALTH_CHECK] Fetching latest block number from WebSocket provider...`);

        const blockNumber = await provider.getBlockNumber();
        logger.debug(`[${blockchainName}] [HEALTH_CHECK] ✅ Latest block: ${blockNumber}`);

        // Check if we're receiving events by checking the last synced block
        const config = this.configs[blockchainName];
        if (config && config.contractAddresses.length > 0) {
          logger.debug(`[${blockchainName}] [HEALTH_CHECK] Checking sync status for ${config.contractAddresses.length} contract(s)...`);

          const contractAddress = config.contractAddresses[0];
          logger.debug(`[${blockchainName}] [HEALTH_CHECK] Checking contract: ${contractAddress}`);

          const lastSyncedBlock = await this.getLastSyncedBlock(blockchainName, contractAddress);
          logger.debug(`[${blockchainName}] [HEALTH_CHECK] Last synced block: ${lastSyncedBlock}`);

          if (lastSyncedBlock !== null) {
            const blocksBehind = blockNumber - lastSyncedBlock;
            logger.debug(`[${blockchainName}] [HEALTH_CHECK] Blocks behind: ${blocksBehind} (threshold: ${this.syncThresholdBlocks})`);

            // If we're more than threshold blocks behind, trigger synchronization
            if (blocksBehind > this.syncThresholdBlocks) {
              logger.warn(`[${blockchainName}] [HEALTH_CHECK] ⚠️ SYNC NEEDED: ${blocksBehind} blocks behind (last synced: ${lastSyncedBlock}, current: ${blockNumber})`);
              logger.info(`[${blockchainName}] [HEALTH_CHECK] 🔄 Triggering synchronization for contract ${contractAddress}`);

              // Trigger synchronization for this contract
              const contracts = this.contracts[blockchainName];
              if (contracts) {
                logger.debug(`[${blockchainName}] [HEALTH_CHECK] Found ${contracts.length} contract instance(s)`);
                const contract = contracts.find(c => c.target === contractAddress);

                if (contract) {
                  logger.info(`[${blockchainName}] [HEALTH_CHECK] Contract instance found, starting fetchHistoricalEvents...`);
                  logger.debug(`[${blockchainName}] [HEALTH_CHECK] From block: ${Number(lastSyncedBlock) + 1}, To block: ${blockNumber}`);

                  const result = await this.fetchHistoricalEvents(blockchainName, contract, Number(lastSyncedBlock) + 1, blockNumber);

                  logger.debug(`[${blockchainName}] [HEALTH_CHECK] Sync result: ${result ? 'SUCCESS' : 'FAILED'}`);
                  return result;
                } else {
                  logger.error(`[${blockchainName}] [HEALTH_CHECK] ❌ Contract ${contractAddress} not found in contracts array`);
                }
              } else {
                logger.error(`[${blockchainName}] [HEALTH_CHECK] ❌ No contracts array found`);
              }

              return false;
            } else {
              logger.debug(`[${blockchainName}] [HEALTH_CHECK] ✅ Sync is up to date (${blocksBehind} blocks behind threshold)`);
            }
          } else {
            logger.warn(`[${blockchainName}] [HEALTH_CHECK] ⚠️ No last synced block found (first run?)`);
          }
        } else {
          logger.debug(`[${blockchainName}] [HEALTH_CHECK] No contracts configured or empty contract addresses array`);
        }

        logger.debug(`[${blockchainName}] [HEALTH_CHECK] ✅ Health check PASSED`);
        return true;
      }

      // ========== SOLANA HEALTH CHECK ==========
      if (provider instanceof Connection) {
        logger.debug(`[${blockchainName}] [HEALTH_CHECK] Running Solana-specific health check...`);
        return await this.checkSolanaConnectionHealth(blockchainName, provider);
      }

      // For other providers (HTTP, Solana), also check connectivity
      if (provider instanceof ethers.JsonRpcProvider) {
        logger.debug(`[${blockchainName}] [HEALTH_CHECK] Fetching latest block number from JsonRpc provider...`);
        const blockNumber = await provider.getBlockNumber();
        logger.debug(`[${blockchainName}] [HEALTH_CHECK] ✅ Latest block: ${blockNumber}`);
        return true;
      }

      logger.debug(`[${blockchainName}] [HEALTH_CHECK] ✅ Unknown provider type, assuming healthy`);
      return true;
    } catch (error) {
      logger.error(`[${blockchainName}] [HEALTH_CHECK] ❌ Health check FAILED with error:`, error);
      return false;
    }
  }

  private async checkSolanaConnectionHealth(
    blockchainName: string,
    connection: Connection
  ): Promise<boolean> {
    try {
      logger.debug(`[${blockchainName}] [SOLANA_HEALTH] Starting Solana health check...`);

      const currentBlock = await connection.getSlot('confirmed');
      logger.debug(`[${blockchainName}] [SOLANA_HEALTH] Current block/slot: ${currentBlock}`);

      const config = this.configs[blockchainName];
      if (config?.extra?.programId) {
        const programId = this.solanaProgramId[blockchainName];
        logger.debug(`[${blockchainName}] [SOLANA_HEALTH] Program ID: ${programId.toBase58()}`);

        const lastSyncedBlock = await this.getLastSyncedBlock(
          blockchainName,
          programId.toBase58()
        );
        logger.debug(`[${blockchainName}] [SOLANA_HEALTH] Last synced block: ${lastSyncedBlock}`);

        if (lastSyncedBlock !== null) {
          const blocksBehind = currentBlock - lastSyncedBlock;
          const solanaThreshold = this.syncThresholdBlocks * 10;

          logger.debug(
            `[${blockchainName}] [SOLANA_HEALTH] Blocks behind: ${blocksBehind} ` +
            `(last synced: ${lastSyncedBlock}, current: ${currentBlock}, threshold: ${solanaThreshold})`
          );

          // If we are behind by more than threshold slots - trigger synchronization
          if (blocksBehind > solanaThreshold) {
            logger.warn(
              `[${blockchainName}] [SOLANA_HEALTH] ⚠️ SYNC NEEDED: ${blocksBehind} blocks behind threshold (${solanaThreshold})`
            );

            logger.info(`[${blockchainName}] [SOLANA_HEALTH] 🔄 Triggering Solana synchronization`);
            logger.info(`[${blockchainName}] [SOLANA_HEALTH] Using fetchSolanaTransactions from checkSolanaConnectionHealth`);
            logger.info(`[${blockchainName}] [SOLANA_HEALTH] isHistorical: false`);

            await this.fetchSolanaTransactions(
              blockchainName,
              programId,
              lastSyncedBlock + 1,
              currentBlock,
              false
            ).catch((error: any) => {
              logger.error(`[${blockchainName}] [SOLANA_HEALTH] ❌ Failed to sync Solana events:`, error);
              return false;
            });
          } else {
            logger.debug(`[${blockchainName}] [SOLANA_HEALTH] ✅ Sync is up to date`);
          }
        } else {
          logger.warn(`[${blockchainName}] [SOLANA_HEALTH] ⚠️ No last synced block found`);
        }
      } else {
        logger.debug(`[${blockchainName}] [SOLANA_HEALTH] No program ID configured in extra config`);
      }

      logger.debug(`[${blockchainName}] [SOLANA_HEALTH] ✅ Connection is healthy`);
      return true;

    } catch (error) {
      logger.error(`[${blockchainName}] [SOLANA_HEALTH] ❌ Health check FAILED:`, error);
      return false;
    }
  }

  // Start health check for a blockchain
  private startHealthCheck(blockchainName: string): void {
    logger.debug(`[${blockchainName}] [HEALTH_TIMER] Setting up health check timer (interval: ${this.healthCheckInterval}ms)...`);

    // Clear existing timer if any
    if (this.healthCheckTimers[blockchainName]) {
      logger.debug(`[${blockchainName}] [HEALTH_TIMER] Clearing existing timer...`);
      clearInterval(this.healthCheckTimers[blockchainName]);
    }

    this.healthCheckTimers[blockchainName] = setInterval(async () => {
      logger.debug(`[${blockchainName}] [HEALTH_TIMER] ⏰ Health check timer triggered`);
      const isHealthy = await this.checkConnectionHealth(blockchainName);
      this.connectionStates[blockchainName] = isHealthy;

      if (!isHealthy) {
        logger.warn(`[${blockchainName}] [HEALTH_TIMER] ⚠️ Connection unhealthy, attempting reconnection...`);
        await this.reconnectBlockchain(blockchainName);
      } else {
        logger.debug(`[${blockchainName}] [HEALTH_TIMER] ✅ Connection healthy, resetting reconnect attempts`);
        // Reset reconnect attempts on successful health check
        this.reconnectAttempts[blockchainName] = 0;
      }
    }, this.healthCheckInterval);

    logger.info(`[${blockchainName}] [HEALTH_TIMER] ✅ Health check timer started successfully`);
  }

  // Reconnect to a blockchain
  private async reconnectBlockchain(blockchainName: string): Promise<void> {
    logger.info(`[${blockchainName}] [RECONNECT] Starting reconnection process...`);

    const config = this.configs[blockchainName];
    if (!config) {
      logger.error(`[${blockchainName}] [RECONNECT] ❌ No configuration found`);
      return;
    }

    const currentAttempts = this.reconnectAttempts[blockchainName] || 0;
    logger.debug(`[${blockchainName}] [RECONNECT] Current attempt: ${currentAttempts}, Max attempts: ${this.maxReconnectAttempts}`);

    if (currentAttempts >= this.maxReconnectAttempts) {
      logger.error(`[${blockchainName}] [RECONNECT] ❌ Max reconnection attempts (${this.maxReconnectAttempts}) reached`);
      return;
    }

    this.reconnectAttempts[blockchainName] = currentAttempts + 1;
    logger.info(`[${blockchainName}] [RECONNECT] Reconnection attempt ${currentAttempts + 1}/${this.maxReconnectAttempts}`);

    try {
      // Clean up existing connections
      logger.debug(`[${blockchainName}] [RECONNECT] Cleaning up existing connections...`);
      await this.cleanupBlockchain(blockchainName);

      // Wait before reconnecting
      const delayMs = this.reconnectDelay * currentAttempts;
      logger.debug(`[${blockchainName}] [RECONNECT] Waiting ${delayMs}ms before reconnecting...`);
      await this.delay(delayMs);

      // Recreate the blockchain connection
      logger.debug(`[${blockchainName}] [RECONNECT] Recreating blockchain connection...`);
      this.addBlockchain(blockchainName, config);

      // Restart listening for events
      if (blockchainName.toLowerCase() === 'solana') {
        logger.debug(`[${blockchainName}] [RECONNECT] Restarting Solana event listeners...`);
        await this.listenToSolanaEvents(blockchainName, config);
      } else {
        logger.debug(`[${blockchainName}] [RECONNECT] Restarting Ethereum event listeners...`);
        await this.listenToEthereumEvents(blockchainName, config);
      }

      // Start health check again
      logger.debug(`[${blockchainName}] [RECONNECT] Restarting health check...`);
      this.startHealthCheck(blockchainName);

      logger.info(`[${blockchainName}] [RECONNECT] ✅ Successfully reconnected`);
      this.connectionStates[blockchainName] = true;
      this.reconnectAttempts[blockchainName] = 0;

    } catch (error) {
      logger.error(`[${blockchainName}] [RECONNECT] ❌ Failed to reconnect:`, error);
      this.connectionStates[blockchainName] = false;

      // Schedule next reconnection attempt
      const nextDelayMs = this.reconnectDelay * (currentAttempts + 1);
      logger.warn(`[${blockchainName}] [RECONNECT] Scheduling next attempt in ${nextDelayMs}ms...`);

      setTimeout(() => {
        this.reconnectBlockchain(blockchainName);
      }, nextDelayMs);
    }
  }

  // Clean up blockchain connections
  private async cleanupBlockchain(blockchainName: string): Promise<void> {
    logger.debug(`[${blockchainName}] [CLEANUP] Starting cleanup...`);

    try {
      // Clear health check timer
      if (this.healthCheckTimers[blockchainName]) {
        logger.debug(`[${blockchainName}] [CLEANUP] Clearing health check timer...`);
        clearInterval(this.healthCheckTimers[blockchainName]);
        delete this.healthCheckTimers[blockchainName];
      }

      // Remove all event listeners from contracts
      const contracts = this.contracts[blockchainName];
      if (contracts) {
        logger.debug(`[${blockchainName}] [CLEANUP] Removing event listeners from ${contracts.length} contract(s)...`);
        for (const contract of contracts) {
          await contract.removeAllListeners();
        }
      }

      // Destroy provider if it's a WebSocket provider
      const provider = this.providers[blockchainName];
      if (provider instanceof ethers.WebSocketProvider) {
        logger.debug(`[${blockchainName}] [CLEANUP] Destroying WebSocket provider...`);
        await provider.destroy();
      }

      logger.info(`[${blockchainName}] [CLEANUP] ✅ Cleanup completed`);
    } catch (error) {
      logger.error(`[${blockchainName}] [CLEANUP] ❌ Error during cleanup:`, error);
    }
  }

  // Initialize database repositories
  // Add a blockchain to monitor
  setSyncThreshold(threshold: number) {
    logger.info(`[SYNC_THRESHOLD] Setting sync threshold to ${threshold} blocks`);
    this.syncThresholdBlocks = threshold;
  }

  addBlockchain(name: string, config: BlockchainConfig) {
    logger.info(`[${name}] [ADD_BLOCKCHAIN] Adding blockchain configuration...`);
    logger.debug(`[${name}] [ADD_BLOCKCHAIN] RPC URL: ${config.rpcUrl}`);
    logger.debug(`[${name}] [ADD_BLOCKCHAIN] Chain ID: ${config.chainId}`);
    logger.debug(`[${name}] [ADD_BLOCKCHAIN] Contract addresses: ${config.contractAddresses.join(', ')}`);

    this.configs[name] = config;

    // Create provider based on blockchain type
    if (name.toLowerCase() === 'solana') {
      logger.debug(`[${name}] [ADD_BLOCKCHAIN] Creating Solana provider...`);

      const sol = config.extra!;

      this.providers[name] = new Connection(
        config.rpcUrl,
        config.extra?.commitment || 'confirmed'
      );

      this.solanaProgramId[name] = new PublicKey(sol.programId);
      logger.debug(`[${name}] [ADD_BLOCKCHAIN] Program ID: ${sol.programId}`);

      // --- Load IDL from file ---
      const fullPath = path.isAbsolute(sol.idlPath)
        ? sol.idlPath
        : path.resolve(process.cwd(), sol.idlPath);

      logger.debug(`[${name}] [ADD_BLOCKCHAIN] IDL path: ${fullPath}`);

      if (!fs.existsSync(fullPath)) {
        logger.error(`[${name}] [ADD_BLOCKCHAIN] ❌ IDL file not found: ${fullPath}`);
        throw new Error(`IDL file not found: ${fullPath}`);
      }

      try {
        const raw = fs.readFileSync(fullPath, "utf8");
        this.solanaIdl[name] = JSON.parse(raw) as Idl;
        logger.debug(`[${name}] [ADD_BLOCKCHAIN] ✅ IDL loaded successfully`);
      } catch (err) {
        logger.error(`[${name}] [ADD_BLOCKCHAIN] ❌ Failed to read/parse IDL:`, err);
        throw err;
      }

      // For Solana, mark as connected by default
      this.connectionStates[name] = true;
      this.reconnectAttempts[name] = 0;
      logger.info(`[${name}] [ADD_BLOCKCHAIN] ✅ Solana blockchain added successfully`);
    } else {
      logger.debug(`[${name}] [ADD_BLOCKCHAIN] Creating Ethereum-compatible provider...`);

      // Ethereum-compatible chains
      const isSocket = config.rpcUrl.startsWith('wss://') || config.rpcUrl.startsWith('ws://');
      logger.debug(`[${name}] [ADD_BLOCKCHAIN] Is WebSocket: ${isSocket}`);

      let provider: ethers.JsonRpcApiProvider;
      if (isSocket) {
        logger.debug(`[${name}] [ADD_BLOCKCHAIN] Creating WebSocketProvider...`);
        provider = new ethers.WebSocketProvider(config.rpcUrl);

        // Add WebSocket event handlers
        const wsProvider = provider as WebSocketProviderWithEvents;
        if (wsProvider._websocket) {
          logger.debug(`[${name}] [ADD_BLOCKCHAIN] Setting up WebSocket event handlers...`);

          wsProvider._websocket.on('open', () => {
            logger.info(`[${name}] [WEBSOCKET] ✅ Connection opened`);
            this.connectionStates[name] = true;
            this.reconnectAttempts[name] = 0;
          });

          wsProvider._websocket.on('close', (code: number, reason: string) => {
            logger.warn(`[${name}] [WEBSOCKET] ❌ Connection closed - Code: ${code}, Reason: ${reason}`);
            this.connectionStates[name] = false;
          });

          wsProvider._websocket.on('error', (error: Error) => {
            logger.error(`[${name}] [WEBSOCKET] ❌ WebSocket error:`, error);
            this.connectionStates[name] = false;
          });
        } else {
          logger.warn(`[${name}] [ADD_BLOCKCHAIN] ⚠️ Could not access WebSocket events, using fallback monitoring`);
          this.connectionStates[name] = true;
        }
      } else {
        logger.debug(`[${name}] [ADD_BLOCKCHAIN] Creating JsonRpcProvider...`);
        provider = new ethers.JsonRpcProvider(config.rpcUrl);
        // For HTTP providers, mark as connected by default
        this.connectionStates[name] = true;
        this.reconnectAttempts[name] = 0;
      }

      this.providers[name] = provider;

      // Create contract instances
      logger.debug(`[${name}] [ADD_BLOCKCHAIN] Creating ${config.contractAddresses.length} contract instance(s)...`);

      this.contracts[name] = config.contractAddresses.map(address => {
        logger.debug(`[${name}] [ADD_BLOCKCHAIN] Creating event contract for ${address}`);
        const eventInterface = new ethers.Interface(eventABIs);
        return new ethers.Contract(address, eventInterface, provider);
      });

      this.readContracts[name] = config.contractAddresses.map(address => {
        logger.debug(`[${name}] [ADD_BLOCKCHAIN] Creating read contract for ${address}`);
        const readInterface = new ethers.Interface(contractReadABIs);
        return new ethers.Contract(address, readInterface, provider);
      });

      logger.info(`[${name}] [ADD_BLOCKCHAIN] ✅ Ethereum-compatible blockchain added successfully`);
    }
  }

  // Get the last synchronized block for a blockchain/contract
  private async getLastSyncedBlock(
    blockchainName: string,
    contractAddress: string,
  ): Promise<number | null> {
    logger.debug(`[${blockchainName}] [GET_LAST_SYNCED] Querying last synced block for contract: ${contractAddress}`);

    const syncRecord = await this.blockchainSyncRepository.findOne({
      where: {
        blockchainName,
        contractAddress,
      },
    });

    const result = (syncRecord && Number(syncRecord.lastSyncedBlock)) || null;
    logger.debug(`[${blockchainName}] [GET_LAST_SYNCED] Result: ${result}`);

    return result;
  }

  // Update the last synchronized block for a blockchain/contract
  private async updateLastSyncedBlock(
    blockchainName?: string,
    contractAddress?: string,
    blockNumber?: number,
  ): Promise<void> {
    if (!blockNumber || !blockchainName || !contractAddress) {
      logger.debug(`[UPDATE_LAST_SYNCED] ⚠️ Skipping update - missing parameters (blockchain: ${blockchainName}, contract: ${contractAddress}, block: ${blockNumber})`);
      return;
    }

    logger.debug(`[${blockchainName}] [UPDATE_LAST_SYNCED] Updating last synced block to ${blockNumber} for contract ${contractAddress}`);

    let syncRecord = await this.blockchainSyncRepository.findOne({
      where: {
        blockchainName,
        contractAddress,
      },
    });

    if (syncRecord) {
      logger.debug(`[${blockchainName}] [UPDATE_LAST_SYNCED] Found existing record, updating from ${syncRecord.lastSyncedBlock} to ${blockNumber}`);
      syncRecord.lastSyncedBlock = blockNumber;
    } else {
      logger.debug(`[${blockchainName}] [UPDATE_LAST_SYNCED] No existing record, creating new entry`);
      syncRecord = this.blockchainSyncRepository.create({
        blockchainName,
        contractAddress,
        lastSyncedBlock: blockNumber,
      });
    }

    await this.blockchainSyncRepository.save(syncRecord);
    logger.debug(`[${blockchainName}] [UPDATE_LAST_SYNCED] ✅ Successfully saved to database`);
  }

  // Start listening for events
  public async startListening() {
    logger.info(`[START_LISTENING] Starting to listen for events on all blockchains...`);
    logger.debug(`[START_LISTENING] Total blockchains configured: ${Object.keys(this.configs).length}`);

    const listeningPromises = Object.entries(this.configs).map(([name, config]) => {
      logger.debug(`[START_LISTENING] Processing blockchain: ${name}`);

      if (name.toLowerCase() === 'solana') {
        logger.debug(`[${name}] [START_LISTENING] Starting Solana event listener...`);
        return this.listenToSolanaEvents(name, config).catch(error => {
          logger.error(`[${name}] [START_LISTENING] ❌ Error listening to events:`, error);
        });
      } else {
        logger.debug(`[${name}] [START_LISTENING] Starting Ethereum event listener...`);
        return this.listenToEthereumEvents(name, config).catch(error => {
          logger.error(`[${name}] [START_LISTENING] ❌ Error listening to events:`, error);
        });
      }
    });

    await Promise.all(listeningPromises);
    logger.info(`[START_LISTENING] ✅ All event listeners started`);

    // Start health checks for all blockchains
    logger.debug(`[START_LISTENING] Starting health checks for all blockchains...`);
    Object.keys(this.configs).forEach(blockchainName => {
      this.startHealthCheck(blockchainName);
    });
    logger.info(`[START_LISTENING] ✅ All health checks started`);
  }

  private async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000,
  ): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (isError(error, 'BAD_DATA') && error.message.includes('Too Many Requests')) {
          if (attempt === maxRetries) {
            throw error; // last try - just throw
          }

          const delay = baseDelay * Math.pow(2, attempt - 1); // exponential delay
          logger.warn(`Rate limit hit (attempt ${attempt}/${maxRetries}), waiting ${delay}ms`);
          await this.delay(delay);
        } else {
          throw error; // other error - just throw
        }
      }
    }

    throw new Error('Max retries exceeded');
  }

  private async fetchHistoricalEvents(
    name: string,
    contract: ethers.Contract,
    fromBlock: number,
    toBlock: number,
  ) {
    const contractAddress = contract.target.toString();
    logger.info(
      `Fetching historical events for ${name} contract ${contractAddress} from block ${fromBlock} to ${toBlock}`,
    );

    try {
      const totalBlocks = toBlock - fromBlock + 1;

      // If range is within limit, fetch directly
      if (totalBlocks <= this.maxBlockRange) {
        const allEvents = await this.retryWithBackoff(async () => {
          return await contract.queryFilter('*', fromBlock, toBlock);
        });

        logger.info(`Found ${allEvents.length} total events for ${name} contract ${contractAddress}`);

        for (const event of allEvents) {
          if (!(event instanceof EventLog)) {
            continue;
          }
          try {
            await this.processEvent(event, name, contractAddress);
          } catch (error) {
            if (error instanceof QueryFailedError && error.driverError.code === '23505') {
              logger.info(`Duplicate event ignored: ${event.transactionHash}:${event.index}`);
            } else {
              logger.error(`Error processing event ${event.eventName}:`, error);
            }
          }
        }

        await this.updateLastSyncedBlock(name, contractAddress, toBlock);
        logger.info(`Completed fetching historical events for ${name} contract ${contractAddress}`);
        return true;
      }

      logger.info(
        `Range too large (${totalBlocks} blocks). Splitting into chunks of ${this.maxBlockRange} blocks.`
      );

      let currentFrom = fromBlock;
      let chunkNumber = 0;
      const totalChunks = Math.ceil(totalBlocks / this.maxBlockRange);

      while (currentFrom <= toBlock) {
        chunkNumber++;
        const currentTo = Math.min(currentFrom + this.maxBlockRange - 1, toBlock);

        logger.info(
          `Processing chunk ${chunkNumber}/${totalChunks}: blocks ${currentFrom} to ${currentTo}`
        );

        const allEvents = await this.retryWithBackoff(async () => {
          return await contract.queryFilter('*', currentFrom, currentTo);
        });

        logger.info(
          `Found ${allEvents.length} events in chunk ${chunkNumber}/${totalChunks} for ${name} contract ${contractAddress}`
        );

        for (const event of allEvents) {
          if (!(event instanceof EventLog)) {
            continue;
          }
          try {
            await this.processEvent(event, name, contractAddress);
          } catch (error) {
            if (error instanceof QueryFailedError && error.driverError.code === '23505') {
              logger.info(`Duplicate event ignored: ${event.transactionHash}:${event.index}`);
            } else {
              logger.error(`Error processing event ${event.eventName}:`, error);
            }
          }
        }

        await this.updateLastSyncedBlock(name, contractAddress, currentTo);

        logger.info(
          `Completed chunk ${chunkNumber}/${totalChunks} for ${name} contract ${contractAddress}`
        );

        currentFrom = currentTo + 1;

        // Small delay between chunks to avoid rate limiting
        if (currentFrom <= toBlock) {
          await this.delay(100);
        }
      }

      logger.info(
        `Completed fetching all historical events for ${name} contract ${contractAddress} (${totalChunks} chunks)`
      );
      return true;

    } catch (error) {
      logger.error(
        `Error fetching historical events for ${name} contract ${contractAddress}:`,
        error,
      );
      return false
    }
  }

  private async fetchSolanaTransactions(
    name: string,
    programId: PublicKey,
    fromBlock: number,
    toBlock: number,
    isHistorical: boolean
  ): Promise<boolean> {
    const connection = this.providers[name] as Connection;
    const programIdString = programId.toBase58();

    logger.info(
      `Fetching historical Solana transactions for program ${programIdString} from block ${fromBlock} to ${toBlock}`
    );

    try {
      let allSignatures: string[] = [];
      let before: string | undefined = undefined;
      let hasMore = true;
      let pageIndex = 0;

      while (hasMore) {
        pageIndex++;
        logger.debug(`[${name}] getSignaturesForAddress page ${pageIndex} (before=${before ?? 'undefined'})`);

        let signatures;
        try {
          signatures = await this.retryWithBackoff(async () =>
            connection.getSignaturesForAddress(programId, { before, limit: 1000 }, 'confirmed')
          );
        } catch (err) {
          logger.error(`[${name}] Failed to get signatures for address (page ${pageIndex}, before=${before}):`, err);
          throw err;
        }

        if (!Array.isArray(signatures) || signatures.length === 0) {
          logger.debug(`[${name}] No signatures returned on page ${pageIndex}; stopping pagination.`);
          hasMore = false;
          break;
        }

        const firstBlockOnPage = signatures[0]?.slot;
        const lastBlockOnPage = signatures[signatures.length - 1]?.slot;
        logger.info(
          `[${name}] Page ${pageIndex}: fetched ${signatures.length} signatures (firstBlock=${firstBlockOnPage}, lastBlock=${lastBlockOnPage})`
        );

        // Checking whether the entire page is below the range
        if (firstBlockOnPage < fromBlock) {
          logger.info(
            `[${name}] First slot on page ${pageIndex} (${firstBlockOnPage}) < fromBlock (${fromBlock}); stopping pagination early.`
          );
          hasMore = false;
          break;
        }

        // Filter by block range
        const filteredSignatures = signatures.filter(sig => {
          return sig.slot >= fromBlock && sig.slot <= toBlock;
        });

        const addedCount = filteredSignatures.length;
        logger.info(
          `[${name}] Page ${pageIndex}: ${addedCount} signatures inside range [${fromBlock}, ${toBlock}] (filtered from ${signatures.length})`
        );

        if (addedCount > 0) {
          allSignatures.push(...filteredSignatures.map(sig => sig.signature));
          logger.debug(`[${name}] Page ${pageIndex}: pushed ${addedCount} signatures to allSignatures (total now ${allSignatures.length})`);
        }

        // Checking whether the lower limit has been reached
        if (lastBlockOnPage < fromBlock) {
          logger.info(`[${name}] Last block on page (${lastBlockOnPage}) < fromBlock (${fromBlock}); stopping pagination.`);
          hasMore = false;
          break;
        }

        // Set the cursor for the next page
        before = signatures[signatures.length - 1].signature;
        logger.debug(`[${name}] Set 'before' cursor to ${before} for next page`);

        // If you received less than 1000, then this is the last page
        if (signatures.length < 1000) {
          logger.info(`[${name}] Page ${pageIndex} returned less than 1000 signatures (${signatures.length}); assuming last page.`);
          hasMore = false;
        }

        // Delay to avoid RPC overloading
        await this.delay(100);
      }

      logger.info(
        `[${name}] Found ${allSignatures.length} total transactions for program ${programIdString} in range [${fromBlock}, ${toBlock}]`
      );

      // Reverse the array to process transactions from oldest to newest
      // This is critical because event FirstTicketBonusAwarded must be processed before event TicketPurchased
      allSignatures.reverse();
      logger.debug(`[${name}] Reversed signatures array to process from oldest to newest (${allSignatures.length} transactions)`);


      let processedCount = 0;
      let errorCount = 0;
      let skippedCountNotFound = 0;
      let skippedCountMetaErr = 0;

      for (const signature of allSignatures) {
        try {
          await this.retryWithBackoff(async () => {
            logger.debug(`[${name}] Fetching transaction ${signature}`);
            const tx = await connection.getTransaction(signature, {
              maxSupportedTransactionVersion: 0,
              commitment: 'confirmed'
            });

            if (!tx) {
              logger.warn(`[${name}] Transaction ${signature} returned null (not found). Marking as skipped.`);
              skippedCountNotFound++;
              return;
            }

            if (!tx.meta) {
              logger.warn(`[${name}] Transaction ${signature} has no meta; skipping. tx.block=${tx.slot}`);
              skippedCountNotFound++;
              return;
            }

            if (tx.meta.err) {
              logger.warn(`[${name}] Transaction ${signature} failed according to meta.err: ${JSON.stringify(tx.meta.err)}; skipping.`);
              skippedCountMetaErr++;
              return;
            }

            const block = tx.slot;

            logger.info(`Use processSolanaTransactionData from fetchSolanaTransactions`);
            await this.processSolanaTransactionData(
              name,
              tx,
              signature,
              block,
              programId,
              isHistorical
            );

            processedCount++;
            logger.info(`[${name}] Successfully processed transaction ${signature} (processedCount=${processedCount})`);
          });
        } catch (error) {
          if (error instanceof QueryFailedError && (error as any).driverError?.code === '23505') {
            // PostgreSQL unique violation error code - ignore
            logger.info(`[${name}] Duplicate Solana transaction ignored: ${signature}`);
          } else {
            logger.error(`[${name}] Error processing Solana transaction ${signature}:`, error);
            errorCount++;
          }
        }

        if ((processedCount + skippedCountNotFound + skippedCountMetaErr + errorCount) % 10 === 0) {
          await this.delay(50);
        }
      }

      logger.info(
        `[${name}] Completed fetching historical Solana transactions for ${programIdString}. ` +
        `Processed: ${processedCount}, SkippedNotFound: ${skippedCountNotFound}, SkippedMetaErr: ${skippedCountMetaErr}, Errors: ${errorCount}`
      );

      try {
        await this.updateLastSyncedBlock(name, programIdString, toBlock);
        logger.info(`[${name}] Updated last synced block to ${toBlock}`);
      } catch (err) {
        logger.error(`[${name}] Failed to update last synced block for ${programIdString}:`, err);
      }

      return true;
    } catch (error) {
      logger.error(
        `[${name}] Error fetching historical Solana transactions for program ${programIdString}:`,
        error
      );
      return false;
    }
  }


  private async processEvent(event: EventLog, name: string, contractAddress: string) {
    const eventName = event.eventName;
    const args = event.args;
    const chainId = this.configs[name].chainId;

    logger.info(`Historical ${eventName} event found on ${name}`);
    switch (eventName) {
      case 'WinnerPicked':
        await this.processWinnerPickedEvent(
          args.token,
          args.roundId,
          args.timestamp,
          chainId,
          event.transactionHash,
          event.blockNumber,
          name,
          contractAddress,
          event.index,
        );
        break;

      case 'TicketPurchased':
        await this.processTicketPurchasedEvent(
          args.token,
          args.roundId,
          args.buyer,
          getNumber(args.count),
          args.totalAmount,
          args.timestamp,
          chainId,
          event.transactionHash,
          event.blockNumber,
          name,
          contractAddress,
          event.index,
        );
        break;

      case 'FirstTicketBonusAwarded':
        await this.processFirstTicketBonusEvent(
          args.token,
          args.roundId,
          args.buyer,
          args.timestamp,
          args.roundStartTime,
          args.roundEndTime,
          chainId,
          event.transactionHash,
          event.blockNumber,
          name,
          contractAddress,
          event.index,
        );
        break;

      default:
        logger.debug(`Unknown event type: ${eventName}`);
    }
  }

  private async processSolanaTransactionData(
    blockchainName: string,
    tx: any,
    signature: string,
    block: number,
    programId: PublicKey,
    isHistorical: boolean
  ) {
    const message = tx.transaction.message;
    const accountKeys = message.staticAccountKeys || message.accountKeys;
    const instructions = message.compiledInstructions || message.instructions;

    logger.debug(`processSolanaTransactionData for signature ${signature} (historical: ${isHistorical})`);

    // ========== TOP-LEVEL INSTRUCTION PROCESSING ==========
    for (let instructionIndex = 0; instructionIndex < instructions.length; instructionIndex++) {
      const instruction = instructions[instructionIndex];
      const programIdIndex = instruction.programIdIndex;
      const instructionProgramId = accountKeys[programIdIndex];

      logger.debug(`Top-level instruction ${instructionIndex}: program ${instructionProgramId.toBase58()}`);

      if (instructionProgramId.equals(programId)) {
        logger.info(`Use decodeSolanaInstruction from processSolanaTransactionData TOP`);
        try {
          await this.decodeSolanaInstruction(
            blockchainName,
            instruction,
            tx,
            signature,
            block,
            instructionIndex,
            false,
            isHistorical
          );
        } catch (error) {
          logger.error(
            `Error decoding top-level Solana instruction ${instructionIndex} in ${signature}:`,
            error
          );
        }
      }
    }

    // ========== INNER INSTRUCTIONS PROCESSING ==========
    if (tx.meta?.innerInstructions) {
      for (const innerInstructionSet of tx.meta.innerInstructions) {
        const parentIndex = innerInstructionSet.index;

        for (let i = 0; i < innerInstructionSet.instructions.length; i++) {
          const innerInstruction = innerInstructionSet.instructions[i];
          const innerProgramIdIndex = innerInstruction.programIdIndex;
          const innerInstructionProgramId = accountKeys[innerProgramIdIndex];

          logger.debug(
            `Inner instruction ${i} (parent ${parentIndex}): program ${innerInstructionProgramId.toBase58()}`
          );

          if (innerInstructionProgramId.equals(programId)) {
            logger.info(`Use decodeSolanaInstruction from processSolanaTransactionData INNER`);
            try {
              const compositeIndex = parentIndex * 1000 + i; // Example: 3000, 3001, 3002...

              await this.decodeSolanaInstruction(
                blockchainName,
                innerInstruction,
                tx,
                signature,
                block,
                compositeIndex,
                true,
                isHistorical
              );
            } catch (error) {
              logger.error(
                `Error decoding inner Solana instruction ${i} (parent ${parentIndex}) in ${signature}:`,
                error
              );
            }
          }
        }
      }
    }
  }

  private async decodeSolanaInstruction(
    blockchainName: string,
    instruction: any,
    tx: any,
    signature: string,
    block: number,
    instructionIndex: number,
    isInnerInstruction: boolean,
    isHistorical: boolean
  ) {
    const idl = this.solanaIdl[blockchainName];

    if (idl) {
      const coder = new BorshInstructionCoder(idl);

      let instructionData = instruction.data;
      if (isInnerInstruction) {
        instructionData = bs58.decode(instruction.data);
      }

      const decodedIx = coder.decode(Buffer.from(instructionData));

      if (!decodedIx) {
        logger.warn(`Could not decode instruction ${instructionIndex} in ${signature}`);
        return;
      }

      logger.info(`✅ Decoded instruction: ${decodedIx.name}`);
      logger.info(`? isHistorical: ${isHistorical}`);

      const config = this.configs[blockchainName];
      const events = this.parseEventsFromLogs(tx.meta.logMessages, idl);

      switch (decodedIx.name) {
        case 'buy_tickets_sol':
          await this.processSolanaTicketPurchasedEvent(
            config.chainId,
            signature,
            block,
            blockchainName,
            instructionIndex,
            events
          );
          break;

        case 'consume_randomness':
          await this.processSolanaWinnerPickedEvent(
            config.chainId,
            signature,
            block,
            blockchainName,
            instructionIndex,
            events
          );
          break;

        case 'request_randomness':
          if (!isHistorical) {
            await this.processAllRequestsCompletedEvent(
              signature,
              block,
              blockchainName,
              events
            );
          } else {
            logger.debug(`Skipping request_randomness...`);
          }
          break;

        case 'claim_prize_sol':
          await this.processSolanaPrizeClaimedEvent(
            signature,
            block,
            blockchainName,
            events
          );
          break;

        default:
          logger.debug(`Unknown Solana instruction: ${decodedIx.name}`);
      }
    } else {
      logger.warn(`No IDL available for ${blockchainName}, skipping instruction decode`);
    }
  }

  private parseEventsFromLogs(logs: string[], idl: any): any[] {
    const eventCoder = new BorshEventCoder(idl);
    const events: any[] = [];

    for (const log of logs) {
      // Anchor events have the format: "Program data: <base64>"
      if (log.startsWith('Program data: ')) {
        try {
          const data = log.slice('Program data: '.length);
          const event = eventCoder.decode(data);

          if (event) {
            events.push(event);
          }
        } catch (error) {
          // Not all "Program data" logs are events, skip them
          continue;
        }
      }
    }

    return events;
  }

  private async processSolanaTicketPurchasedEvent(
    chainId: number,
    signature: string,
    block: number,
    blockchainName: string,
    instructionIndex: number,
    events: any[]
  ) {
    try {
      logger.debug(`[DEBUG] Starting processSolanaTicketPurchasedEvent for tx: ${signature}`);

      const ticketPurchasedEvent = events.find(e => e.name === 'TicketPurchased');

      if (!ticketPurchasedEvent) {
        logger.warn(`TicketPurchased event not found in transaction ${signature}`);
        return;
      }

      const { token, round_id, buyer, count, total_amount, prize_amount, commission_amount, timestamp } = ticketPurchasedEvent.data;
      const user = await this.getOrCreateUser(buyer.toBase58());

      const programId = this.solanaProgramId[blockchainName];
      const contractAddress = programId.toBase58();
      const tokenAddress = token.toBase58();
      const eventTimestamp = new Date(timestamp.toNumber() * 1000);

      const ticketPurchase = this.ticketPurchaseRepository.create({
        buyer: user,
        token: tokenAddress,
        roundId: round_id,
        chainId,
        contractAddress,
        count,
        totalAmount: total_amount.toString(),
        blockTimestamp: eventTimestamp,
        transactionHash: signature,
        logIndex: instructionIndex,
      });

      await this.ticketPurchaseRepository.save(ticketPurchase);

      logger.info(
        `Processed Solana ticket purchase: ${count} tickets by ${buyer.toBase58()} in round ${round_id}`
      );

      // Find or create user round stats
      let userRoundStats = await this.userRoundStatsRepository.findOne({
        where: {
          user: { id: user.id },
          token: tokenAddress,
          roundId: round_id,
          contractAddress,
        },
      });

      // Find the previous round for this token and contract
      const previousRound = await this.userRoundStatsRepository
        .createQueryBuilder()
        .where('"userId" = :userId', { userId: user.id })
        .andWhere('token = :token', { token: tokenAddress })
        .andWhere('"contractAddress" = :contractAddress', { contractAddress })
        .andWhere('"roundId" < :roundId', { roundId: round_id })
        .orderBy('"roundId"', 'DESC')
        .limit(1)
        .getOne();

      if (!userRoundStats) {
        userRoundStats = this.userRoundStatsRepository.create({
          user,
          token: tokenAddress,
          roundId: round_id,
          contractAddress,
          ticketCount: count,
          totalWins: previousRound?.totalWins || 0,
          roundTimestamp: eventTimestamp,
          isConsecutive: false, // Will be updated below
        });
      } else {
        userRoundStats.ticketCount += count;
      }

      // Check for consecutive rounds participation
      if (previousRound?.roundId === round_id - 1) {
        // User participated in the previous round
        userRoundStats.isConsecutive = true;

        // If the previous round was also consecutive, increment the streak
        if (previousRound.isConsecutive) {
          // Increment the consecutive rounds count for this contract
          userRoundStats.consecutiveRounds = previousRound.consecutiveRounds + 1;
        } else {
          // Start a new streak for this lottery
          userRoundStats.consecutiveRounds = 1;
        }
      } else {
        // Reset consecutive rounds if user missed the previous round
        userRoundStats.consecutiveRounds = 0;
      }

      // Save the updated entities
      await this.userRoundStatsRepository.save(userRoundStats);

      const bonusEvent = events.find(e => e.name === 'FirstTicketBonusAwarded');

      if (bonusEvent) {
        const { token, round_id, buyer, timestamp, round_start_time, round_end_time } = bonusEvent.data;

        logger.info(
          `First ticket bonus awarded to ${bonusEvent.data.buyer.toBase58()} in round ${round_id}`
        );

        const user = await this.getOrCreateUser(buyer.toBase58());

        const round = this.roundRepository.create({
          contractAddress,
          token: token.toBase58(),
          roundId: round_id,
          chainId,
          startTime: new Date(round_start_time.toNumber() * 1000),
          endTime: new Date(round_end_time.toNumber() * 1000),
          prizeAmount: '0',
          commissionAmount: '0',
          prizeClaimed: false,
        });

        await this.roundRepository.save(round);

        const firstTicketBonus = this.firstTicketBonusRepository.create({
          buyer: user,
          token: token.toBase58(),
          roundId: round_id,
          chainId,
          contractAddress,
          blockTimestamp: new Date(timestamp.toNumber() * 1000),
          transactionHash: signature,
          logIndex: instructionIndex,
        });

        await this.firstTicketBonusRepository.save(firstTicketBonus);
      }

      // Update prize_amount and commission_amount in Round
      const round = await this.roundRepository.findOne({
        where: {
          token: tokenAddress,
          roundId: round_id,
          contractAddress,
          chainId,
        }
      });

      if (round) {
        const currentPrizeAmount = BigInt(round.prizeAmount || '0');
        const currentCommissionAmount = BigInt(round.commissionAmount || '0');

        round.prizeAmount = (currentPrizeAmount + BigInt(prize_amount.toString())).toString();
        round.commissionAmount = (currentCommissionAmount + BigInt(commission_amount.toString())).toString();

        await this.roundRepository.save(round);

        logger.info(
          `Updated round ${round_id}: prizeAmount=${round.prizeAmount}, commissionAmount=${round.commissionAmount}`
        );
      } else {
        logger.warn(`Round not found to update amounts: token=${tokenAddress}, roundId=${round_id}`);
      }

      // Update the last synced block
      await this.updateLastSyncedBlock(blockchainName, contractAddress, block);

    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        logger.info(`Duplicate Solana ticket purchase ignored: ${signature}`);
      } else {
        logger.error(`Error processing Solana ticket purchase ${signature}:`, error);
        throw error;
      }
    }
  }

  private async processSolanaWinnerPickedEvent(
    chainId: number,
    signature: string,
    block: number,
    blockchainName: string,
    instructionIndex: number,
    events: any[]
  ) {
    try {
      const winnerPickedEvent = events.find(e => e.name === 'WinnerPicked');

      if (!winnerPickedEvent) {
        logger.warn(`WinnerPicked event not found in transaction ${signature}`);
        return;
      }

      const { token, round, round_id, winner_purchase_index, winner_ticket_index, prize_amount, timestamp } = winnerPickedEvent.data;

      const tokenAddress = token.toBase58();
      const programId = this.solanaProgramId[blockchainName];
      const contractAddress = programId.toBase58();
      const eventTimestamp = new Date(timestamp.toNumber() * 1000);

      const connection = this.providers[blockchainName] as Connection;
      logger.debug(`Round PDA: ${round.toBase58()}, Round ID: ${round_id}`);

      const winnerPubkey = await this.getWinnerAddressFromPurchase(
        connection,
        programId,
        round,
        winner_purchase_index
      );

      if (!winnerPubkey) {
        logger.error(
          `Failed to get winner address for round ${round_id}, purchase index ${winner_purchase_index}`
        );
        return;
      }

      const winnerAddress = winnerPubkey.toBase58();
      logger.info(`Winner address: ${winnerAddress}`);
      const user = await this.getOrCreateUser(winnerAddress);

      let userRoundStats = await this.userRoundStatsRepository.findOne({
        where: {
          user: { id: user.id },
          token: tokenAddress,
          roundId: round_id,
          contractAddress,
        },
      });

      if (!userRoundStats) {
        userRoundStats = this.userRoundStatsRepository.create({
          user: user,
          token: tokenAddress,
          roundId: round_id,
          contractAddress,
          ticketCount: 0,
          totalWins: 1,
          roundTimestamp: eventTimestamp,
          isConsecutive: false,
        });
      } else {
        userRoundStats.totalWins += 1;
      }

      await this.userRoundStatsRepository.save(userRoundStats);

      const playerEntities = await this.statisticsService.getRoundPlayers(
        programId.toBase58(),
        token.toBase58(),
        round_id
      );

      const winEvent = this.winEventRepository.create({
        winner: user,
        token: tokenAddress,
        roundId: round_id,
        chainId,
        contractAddress,
        amount: prize_amount.toString(),
        players: playerEntities,
        ticketId: winner_ticket_index.toString(),
        blockTimestamp: eventTimestamp,
        transactionHash: signature,
        logIndex: instructionIndex,
      });

      await this.winEventRepository.save(winEvent);

      logger.info(
        `Processed Solana winner picked: ${winnerAddress} won round ${round_id}`
      );

      await this.notificationService.createWinNotifications(winEvent);

      logger.info(
        `[${blockchainName}] Attempting to set winner address on-chain`
      );

      try {
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

        this.solanaAuthorityKeypair = Keypair.fromSecretKey(Uint8Array.from(secretKeyArray));

        const setWinnerSignature = await this.setWinnerAddress(
          blockchainName,
          round_id,
          winner_purchase_index,
          this.solanaAuthorityKeypair
        );

        logger.info(
          `[${blockchainName}] ✅ Winner address set on-chain successfully! Transaction: ${setWinnerSignature}`
        );
      } catch (error: any) {
        logger.error(
          `[${blockchainName}] ❌ Failed to set winner address:`,
          error
        );
      }

      await this.updateLastSyncedBlock(blockchainName, contractAddress, block);

    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        logger.info(`Duplicate Solana winner picked event ignored: ${signature}`);
      } else {
        logger.error(`Error processing Solana winner picked event ${signature}:`, error);
        throw error;
      }
    }
  }

  private getRoundTicketsPurchasePDA(
    programId: PublicKey,
    roundPubkey: PublicKey,
    purchaseIndex: number
  ): [PublicKey, number] {
    logger.debug(`getRoundTicketsPurchasePDA called with:`, {
      programId: programId?.toBase58(),
      roundPubkey: roundPubkey?.toBase58(),
      purchaseIndex
    });

    if (!roundPubkey) {
      throw new Error('roundPubkey is undefined or null');
    }

    const purchaseIndexBuf = Buffer.from(new BN(purchaseIndex).toArray('le', 4));
    logger.debug(`purchaseIndexBuf(hex): ${purchaseIndexBuf.toString('hex')}`);

    const [pda, bump] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('round_tickets_purchase'),
        roundPubkey.toBuffer(),
        purchaseIndexBuf
      ],
      programId
    );

    return [pda, bump];
  }

  private async getWinnerAddressFromPurchase(
    connection: Connection,
    programId: PublicKey,
    roundPubkey: PublicKey,
    winnerPurchaseIndex: number
  ): Promise<PublicKey | null> {
    try {
      if (!roundPubkey || !(roundPubkey instanceof PublicKey)) {
        logger.error(`Invalid roundPubkey: ${roundPubkey}`);
        return null;
      }

      const [purchasePDA] = this.getRoundTicketsPurchasePDA(
        programId,
        roundPubkey,
        winnerPurchaseIndex
      );

      logger.debug(`Reading RoundTicketsPurchase account: ${purchasePDA.toBase58()}`);

      const accountInfo = await connection.getAccountInfo(purchasePDA);

      if (!accountInfo) {
        logger.warn(`RoundTicketsPurchase account not found for purchase index ${winnerPurchaseIndex}`);
        return null;
      }

      // RoundTicketsPurchase:
      // 8 bytes - discriminator (anchor)
      // 32 bytes - round (Pubkey)
      // 32 bytes - player (Pubkey)
      // 4 bytes - purchase_index (u32)
      // 4 bytes - tickets_count (u32)
      // 1 byte - bump (u8)

      const playerOffset = 8 + 32; // discriminator + round pubkey
      const playerPubkey = new PublicKey(accountInfo.data.slice(playerOffset, playerOffset + 32));

      logger.debug(`Winner address from purchase: ${playerPubkey.toBase58()}`);
      return playerPubkey;
    } catch (error) {
      logger.error(`Error reading RoundTicketsPurchase account:`, error);
      return null;
    }
  }

  private async setWinnerAddress(
    blockchainName: string,
    roundId: number,
    purchaseIndex: number,
    authorityKeypair: Keypair
  ): Promise<string> {
    try {
      logger.debug(
        `[${blockchainName}] [SET_WINNER] Setting winner address for round ${roundId}, purchase index ${purchaseIndex}`
      );

      const connection = this.providers[blockchainName] as Connection;
      const programId = this.solanaProgramId[blockchainName];
      const idl = this.solanaIdl[blockchainName];
      const wallet = new Wallet(authorityKeypair);
      const provider = new AnchorProvider(connection, wallet, {
        commitment: 'confirmed',
      });
      const program = new Program(idl, provider);

      const [raffleStatePDA] = PublicKey.findProgramAddressSync(
        [Buffer.from('raffle_state')],
        programId
      );

      const [solRafflePDA] = PublicKey.findProgramAddressSync(
        [Buffer.from('sol_raffle')],
        programId
      );

      const [roundPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('round'),
          solRafflePDA.toBuffer(),
          Buffer.from(new BN(roundId).toArray('le', 4))
        ],
        programId
      );

      const [purchasePDA] = this.getRoundTicketsPurchasePDA(
        programId,
        roundPDA,
        purchaseIndex
      );

      logger.debug(`[${blockchainName}] [SET_WINNER] Raffle State PDA: ${raffleStatePDA.toBase58()}`);
      logger.debug(`[${blockchainName}] [SET_WINNER] Sol Raffle PDA: ${solRafflePDA.toBase58()}`);
      logger.debug(`[${blockchainName}] [SET_WINNER] Round PDA: ${roundPDA.toBase58()}`);
      logger.debug(`[${blockchainName}] [SET_WINNER] Purchase PDA: ${purchasePDA.toBase58()}`);
      logger.debug(`[${blockchainName}] [SET_WINNER] Authority: ${authorityKeypair.publicKey.toBase58()}`);

      const signature = await program.methods
        .setWinnerAddress(roundId, purchaseIndex)
        .accounts({
          raffleState: raffleStatePDA,
          solRaffle: solRafflePDA,
          round: roundPDA,
          roundTicketsPurchase: purchasePDA,
          authority: authorityKeypair.publicKey,
        })
        .signers([authorityKeypair])
        .rpc();

      logger.info(
        `[${blockchainName}] [SET_WINNER] Successfully set winner address for round ${roundId}, tx: ${signature}`
      );

      return signature;

    } catch (error: any) {
      logger.error(
        `[${blockchainName}] [SET_WINNER] Error setting winner address for round ${roundId}:`,
        error
      );

      if (error.logs) {
        logger.error(`[${blockchainName}] [SET_WINNER] Transaction logs:`, error.logs);
      }

      throw error;
    }
  }

  private async processAllRequestsCompletedEvent(
    signature: string,
    block: number,
    blockchainName: string,
    events: any[]
  ) {
    try {
      const allRequestsCompletedEvent = events.find(e => e.name === 'AllRequestsCompleted');

      if (!allRequestsCompletedEvent) {
        logger.warn(`AllRequestsCompleted event not found in transaction ${signature}`);
        return;
      }

      const programId = this.solanaProgramId[blockchainName];
      const contractAddress = programId.toBase58();

      logger.debug('Triggering TukTuk cron job update...');
      await this.tukTukService.updateCronJobAfterRequestsCompleted();
      logger.debug(`TukTuk cron job updated successfully!`);

      await this.updateLastSyncedBlock(blockchainName, contractAddress, block);

    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        logger.info(`Duplicate Solana AllRequestsCompleted event ignored: ${signature}`);
      } else {
        logger.error(`Error processing Solana AllRequestsCompleted event ${signature}:`, error);
        throw error;
      }
    }
  }

  private async processSolanaPrizeClaimedEvent(
    signature: string,
    block: number,
    blockchainName: string,
    events: any[]
  ) {
    try {
      const prizeClaimedEvent = events.find(e => e.name === 'PrizeClaimed');

      if (!prizeClaimedEvent) {
        logger.warn(`PrizeClaimed event not found in transaction ${signature}`);
        return;
      }

      const {round_id, winner} = prizeClaimedEvent.data;

      const winnerAddress = winner.toBase58();
      const programId = this.solanaProgramId[blockchainName];
      const contractAddress = programId.toBase58();

      const user = await this.userRepository.findOne({
        where: { address: winnerAddress }
      });

      if (!user) {
        logger.warn(`User not found for winner ${winnerAddress} in transaction ${signature}`);
        return;
      }

      const round = await this.roundRepository
        .createQueryBuilder('round')
        .innerJoin(
          'win_events',
          'we',
          'we.token = round.token AND we."roundId" = round."roundId" AND we."contractAddress" = round."contractAddress" AND we."chainId" = round."chainId"'
        )
        .where('round."roundId" = :roundId', { roundId: round_id })
        .andWhere('round."contractAddress" = :contractAddress', { contractAddress })
        .andWhere('we.winnerId = :userId', { userId: user.id })
        .andWhere('round."prizeClaimed" = false')
        .getOne();

      if (!round) {
        logger.warn(
          `Round ${round_id} not found or already claimed for winner ${winnerAddress}`
        );
        return;
      }

      round.prizeClaimed = true;

      await this.roundRepository.save(round);

      logger.info(
        `Processed Solana prize claimed: ${winnerAddress} claimed prize for round ${round.roundId}`
      );

      await this.updateLastSyncedBlock(blockchainName, contractAddress, block);

    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        logger.info(`Duplicate Solana prize claimed event ignored: ${signature}`);
      } else {
        logger.error(`Error processing Solana prize claimed event ${signature}:`, error);
        throw error;
      }
    }
  }

  // Get contract deployment block number
  private async getDeploymentBlock(
    provider: ethers.JsonRpcProvider,
    contractAddress: string,
  ): Promise<number> {
    const code = await provider.getCode(contractAddress);
    if (code === '0x') return 0;

    let startBlock = 0;
    let endBlock = await provider.getBlockNumber();

    while (startBlock <= endBlock) {
      const midBlock = Math.floor((startBlock + endBlock) / 2);
      const code = await provider.getCode(contractAddress, midBlock);

      if (code === '0x') {
        startBlock = midBlock + 1;
      } else {
        endBlock = midBlock - 1;
      }
    }

    return startBlock;
  }

  // Set up event listeners for a contract
  private async setupEventListeners(
    contract: ethers.Contract,
    name: string,
    contractAddress: string,
    chainId: number,
  ) {
    logger.info(`Setting up event listeners for ${name} contract ${contractAddress}`);

    // Listen for WinnerPicked events
    await contract.on(
      'WinnerPicked',
      (
        token: string,
        roundId: BigNumberish,
        timestamp: BigNumberish,
        event: ContractEventPayload,
      ) => {
        logger.info(`WinnerPicked event detected on ${name}: Token ${token}, Round ${roundId}`);

        this.processWinnerPickedEvent(
          token,
          roundId,
          timestamp,
          chainId,
          event.log.transactionHash,
          event.log.blockNumber,
          name,
          contractAddress,
          event.log.index,
        ).catch(error => {
          if (error instanceof QueryFailedError && error.driverError.code === '23505') {
            // PostgreSQL unique violation error code
            logger.info(
              `Duplicate WinnerPicked event ignored: ${event.log.transactionHash}:${event.log.index}`,
            );
          } else {
            logger.error('Error processing WinnerPicked event:', error);
          }
        });
      },
    );

    // Listen for TicketPurchased events
    await contract.on(
      'TicketPurchased',
      (
        token: string,
        roundId: BigNumberish,
        buyer: string,
        count: BigNumberish,
        totalAmount: BigNumberish,
        timestamp: BigNumberish,
        event: ContractEventPayload,
      ) => {
        logger.info(
          `TicketPurchased event detected on ${name}: Token ${token}, Round ${roundId}, Buyer ${buyer}`,
        );

        this.processTicketPurchasedEvent(
          token,
          roundId,
          buyer,
          getNumber(count),
          totalAmount,
          timestamp,
          chainId,
          event.log.transactionHash,
          event.log.blockNumber,
          name,
          contractAddress,
          event.log.index,
        ).catch(error => {
          if (error instanceof QueryFailedError && error.driverError.code === '23505') {
            // PostgreSQL unique violation error code
            logger.info(
              `Duplicate TicketPurchased event ignored: ${event.log.transactionHash}:${event.log.index}`,
            );
          } else {
            logger.error('Error processing TicketPurchased event:', error);
          }
        });
      },
    );

    // Listen for FirstTicketBonusAwarded events
    await contract.on(
      'FirstTicketBonusAwarded',
      (
        token: string,
        roundId: BigNumberish,
        buyer: string,
        timestamp: BigNumberish,
        roundStartTime: BigNumberish,
        roundEndTime: BigNumberish,
        event: ContractEventPayload,
      ) => {
        logger.info(
          `FirstTicketBonusAwarded event detected on ${name}: Token ${token}, Round ${roundId}, Buyer ${buyer}`,
        );

        this.processFirstTicketBonusEvent(
          token,
          roundId,
          buyer,
          timestamp,
          roundStartTime,
          roundEndTime,
          chainId,
          event.log.transactionHash,
          event.log.blockNumber,
          name,
          contractAddress,
          event.log.index,
        ).catch(error => {
          if (error instanceof QueryFailedError && error.driverError.code === '23505') {
            // PostgreSQL unique violation error code
            logger.info(
              `Duplicate FirstTicketBonusAwarded event ignored: ${event.log.transactionHash}:${event.log.index}`,
            );
          } else {
            logger.error('Error processing FirstTicketBonusAwarded event:', error);
          }
        });
      },
    );

    logger.info(`Started listening for events on ${name} contract ${contractAddress}`);
  }

  // Listen to events on Ethereum-compatible chains
  private async listenToEthereumEvents(name: string, config: BlockchainConfig) {
    const contracts = this.contracts[name];
    const provider = this.providers[name] as ethers.JsonRpcProvider;

    if (!contracts) {
      logger.error(`No contracts found for ${name}`);
      return;
    }

    // Get current block number
    const currentBlock = await provider.getBlockNumber();

    for (const contract of contracts) {
      const contractAddress = contract.target.toString();

      // First, set up event listeners to avoid missing any events
      await this.setupEventListeners(contract, name, contractAddress, config.chainId);

      // Check if we have a record of the last synced block
      const lastSyncedBlock = await this.getLastSyncedBlock(name, contractAddress);

      if (lastSyncedBlock === null) {
        // First run - fetch all historical events
        logger.info(
          `First run for ${name} contract ${contractAddress}, fetching all historical events`,
        );

        // Get deployment block number
        const fromBlock = await this.getDeploymentBlock(provider, contractAddress);
        logger.info(`Contract ${contractAddress} was deployed at block ${fromBlock}`);

        await this.fetchHistoricalEvents(name, contract, fromBlock, currentBlock);
      } else if (lastSyncedBlock < currentBlock) {
        await this.fetchHistoricalEvents(name, contract, lastSyncedBlock + 1, currentBlock);
      }
    }
  }

  // Listen to events on Solana
  private async listenToSolanaEvents(name: string, config: BlockchainConfig) {
    const connection = this.providers[name] as Connection;
    const programId = new PublicKey(config.extra!.programId);

    logger.info(`Starting to listen for Solana events on ${name}`);

    // Check if we have a record of the last synced block
    const lastSyncedBlock = await this.getLastSyncedBlock(name, programId.toBase58());
    const currentBlock = await connection.getSlot();

    if (lastSyncedBlock === null) {
      // First run - fetch all historical events
      logger.info(`First run for ${name}, fetching historical transactions`);
      logger.info(`Use fetchSolanaTransactions from listenToSolanaEvents`);
      logger.info(`isHistorical true`);
      await this.fetchSolanaTransactions(
        name,
        programId,
        0,
        currentBlock,
        true
      );
    } else if (lastSyncedBlock < currentBlock) {
      logger.info(`Use fetchSolanaTransactions from listenToSolanaEvents`);
      logger.info(`isHistorical false`);
      await this.fetchSolanaTransactions(
        name,
        programId,
        lastSyncedBlock + 1,
        currentBlock,
        false
      );
    }
  }

  private async processWinnerPickedEvent(
    token: string,
    roundId: ethers.BigNumberish,
    timestamp: ethers.BigNumberish,
    chainId: number,
    transactionHash: string,
    blockNumber: number,
    blockchainName: string,
    contractAddress: string,
    logIndex: number,
  ) {
    try {
      const roundIdNumber = getNumber(roundId);
      const eventDate = new Date(getNumber(timestamp) * 1000);

      logger.info(`Processing WinnerPicked event for ${blockchainName}, token: ${token}, round: ${roundIdNumber}`);

      const roundResult = await this.getRoundResult(blockchainName, token, roundIdNumber);
      if (!roundResult) {
        logger.error(`Failed to get round result for token: ${token}, round: ${roundIdNumber}`);
        return;
      }

      const winner = await this.getOrCreateUser(roundResult.winnerAddress);

      // Find or create user round stats
      let userRoundStats = await this.userRoundStatsRepository.findOne({
        where: {
          user: { id: winner.id },
          token,
          roundId: roundIdNumber,
          contractAddress,
        },
      });

      if (!userRoundStats) {
        userRoundStats = this.userRoundStatsRepository.create({
          user: winner,
          token,
          roundId: roundIdNumber,
          contractAddress,
          ticketCount: 0,
          totalWins: 1,
          roundTimestamp: eventDate,
          isConsecutive: false,
        });
      } else {
        userRoundStats.totalWins += 1;
      }

      await this.userRoundStatsRepository.save(userRoundStats);

      // Get or create User entities for all players
      const playerEntities: User[] = [];
      for (const playerAddress of roundResult.roundPlayers) {
        const playerUser = await this.getOrCreateUser(playerAddress);
        playerEntities.push(playerUser);
      }

      const winEvent = this.winEventRepository.create({
        winner,
        token,
        roundId: roundIdNumber,
        chainId,
        contractAddress,
        amount: roundResult.prizeAmount.toString(),
        players: playerEntities,
        ticketId: roundResult.winnerTicket.toString(),
        blockTimestamp: eventDate,
        transactionHash,
        logIndex,
      });

      await this.winEventRepository.save(winEvent);

      await this.notificationService.createWinNotifications(winEvent);

      await this.updateLastSyncedBlock(blockchainName, contractAddress, blockNumber);

      logger.info(`Successfully processed WinnerPicked event for winner: ${roundResult.winnerAddress}`);
    } catch (error) {
      // Check if this is a duplicate event (unique constraint violation)
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        logger.info(`Duplicate WinnerPicked event ignored: ${transactionHash}:${logIndex}`);
      } else {
        logger.error(`Error processing WinnerPicked event:`, error);
        throw error;
      }
    }
  }

  private async processTicketPurchasedEvent(
    token: string,
    roundId: ethers.BigNumberish,
    buyer: string,
    count: number,
    totalAmount: ethers.BigNumberish,
    timestamp: ethers.BigNumberish,
    chainId: number,
    transactionHash: string,
    blockNumber: number,
    blockchainName: string,
    contractAddress: string,
    logIndex: number,
  ) {
    try {
      const user = await this.getOrCreateUser(buyer);
      const roundIdNumber = getNumber(roundId);
      const blockTimestamp = new Date(getNumber(timestamp) * 1000);

      const ticketPurchase = this.ticketPurchaseRepository.create({
        buyer: user,
        token,
        roundId: roundIdNumber,
        chainId,
        contractAddress,
        count,
        totalAmount: getBigInt(totalAmount).toString(),
        blockTimestamp,
        transactionHash,
        logIndex,
      });

      await this.ticketPurchaseRepository.save(ticketPurchase);

      // Find or create user round stats
      let userRoundStats = await this.userRoundStatsRepository.findOne({
        where: {
          user: { id: user.id },
          token,
          roundId: roundIdNumber,
          contractAddress,
        },
      });

      // Find the previous round for this token and contract
      const previousRound = await this.userRoundStatsRepository
        .createQueryBuilder()
        .where('"userId" = :userId', { userId: user.id })
        .andWhere('token = :token', { token })
        .andWhere('"contractAddress" = :contractAddress', { contractAddress })
        .andWhere('"roundId" < :roundId', { roundId: roundIdNumber })
        .orderBy('"roundId"', 'DESC')
        .limit(1)
        .getOne();

      if (!userRoundStats) {
        userRoundStats = this.userRoundStatsRepository.create({
          user,
          token,
          roundId: roundIdNumber,
          contractAddress,
          ticketCount: count,
          totalWins: previousRound?.totalWins || 0,
          roundTimestamp: blockTimestamp,
          isConsecutive: false, // Will be updated below
        });
      } else {
        userRoundStats.ticketCount += count;
      }

      // Check for consecutive rounds participation
      if (previousRound?.roundId === roundIdNumber - 1) {
        // User participated in the previous round
        userRoundStats.isConsecutive = true;

        // If the previous round was also consecutive, increment the streak
        if (previousRound.isConsecutive) {
          // Increment the consecutive rounds count for this contract
          userRoundStats.consecutiveRounds = previousRound.consecutiveRounds + 1;
        } else {
          // Start a new streak for this lottery
          userRoundStats.consecutiveRounds = 1;
        }
      } else {
        // Reset consecutive rounds if user missed the previous round
        userRoundStats.consecutiveRounds = 0;
      }

      // Save the updated entities
      await this.userRoundStatsRepository.save(userRoundStats);

      await this.updateLastSyncedBlock(blockchainName, contractAddress, blockNumber);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        logger.info(`Duplicate TicketPurchased event ignored: ${transactionHash}:${logIndex}`);
      } else {
        throw error;
      }
    }
  }

  private async processFirstTicketBonusEvent(
    token: string,
    roundId: ethers.BigNumberish,
    buyer: string,
    timestamp: ethers.BigNumberish,
    roundStartTime: ethers.BigNumberish,
    roundEndTime: ethers.BigNumberish,
    chainId: number,
    transactionHash: string,
    blockNumber: number,
    blockchainName: string,
    contractAddress: string,
    logIndex: number,
  ) {
    try {
      const user = await this.getOrCreateUser(buyer);

      const round = this.roundRepository.create({
        contractAddress,
        token,
        roundId: getNumber(roundId),
        chainId,
        startTime: new Date(getNumber(roundStartTime) * 1000),
        endTime: new Date(getNumber(roundEndTime) * 1000),
      });

      await this.roundRepository.save(round);

      const firstTicketBonus = this.firstTicketBonusRepository.create({
        buyer: user,
        token,
        roundId: getNumber(roundId),
        chainId,
        contractAddress,
        blockTimestamp: new Date(getNumber(timestamp) * 1000),
        transactionHash,
        logIndex,
      });

      await this.firstTicketBonusRepository.save(firstTicketBonus);

      await this.updateLastSyncedBlock(blockchainName, contractAddress, blockNumber);
    } catch (error) {
      // Check if this is a duplicate event (unique constraint violation)
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        logger.info(
          `Duplicate FirstTicketBonusAwarded event ignored: ${transactionHash}:${logIndex}`,
        );
      } else {
        throw error;
      }
    }
  }

  private async getOrCreateUser(address: string): Promise<User> {
    await this.userRepository.createQueryBuilder()
      .insert()
      .into(User)
      .values({ address })
      .orIgnore()
      .execute();

    const user = await this.userRepository.findOne({ where: { address } });

    if (!user) {
      throw new Error(`Failed to get or create user ${address}`);
    }

    return user;
  }

  // Public methods for monitoring connection status
  public getConnectionStatus(): Record<string, { isConnected: boolean; reconnectAttempts: number }> {
    const status: Record<string, { isConnected: boolean; reconnectAttempts: number }> = {};

    Object.keys(this.configs).forEach(blockchainName => {
      status[blockchainName] = {
        isConnected: this.connectionStates[blockchainName] || false,
        reconnectAttempts: this.reconnectAttempts[blockchainName] || 0,
      };
    });

    return status;
  }

  public async forceReconnect(blockchainName: string): Promise<boolean> {
    try {
      logger.info(`Force reconnection requested for ${blockchainName}`);
      await this.reconnectBlockchain(blockchainName);
      return true;
    } catch (error) {
      logger.error(`Failed to force reconnect ${blockchainName}:`, error);
      return false;
    }
  }

  public async stopHealthChecks(): Promise<void> {
    Object.keys(this.healthCheckTimers).forEach(blockchainName => {
      if (this.healthCheckTimers[blockchainName]) {
        clearInterval(this.healthCheckTimers[blockchainName]);
        delete this.healthCheckTimers[blockchainName];
        logger.info(`Stopped health check for ${blockchainName}`);
      }
    });
  }

  public async cleanup(): Promise<void> {
    // Stop all health checks
    await this.stopHealthChecks();

    // Clean up all blockchain connections
    const cleanupPromises = Object.keys(this.configs).map(blockchainName =>
      this.cleanupBlockchain(blockchainName)
    );

    await Promise.all(cleanupPromises);
    logger.info('BlockchainService cleanup completed');
  }

  public async getRoundResult(
    blockchainName: string,
    tokenAddress: string,
    roundId: number,
    contractIndex: number = 0,
  ): Promise<{
    winnerAddress: string;
    winnerTicket: bigint;
    roundPlayers: string[];
    prizeAmount: bigint;
  } | null> {
    try {
      const contracts = this.readContracts[blockchainName];

      if (!contracts || !contracts[contractIndex]) {
        logger.error(`No read contract found for ${blockchainName} at index ${contractIndex}`);
        return null;
      }

      const contract = contracts[contractIndex];

      const result = await this.retryWithBackoff(async () => {
        return await contract.getRoundResult(tokenAddress, roundId);
      });

      return {
        winnerAddress: result.winnerAddress,
        winnerTicket: getBigInt(result.winnerTicket),
        roundPlayers: result.roundPlayers,
        prizeAmount: getBigInt(result.prizeAmount),
      };
    } catch (error) {
      logger.error(
        `Error calling getRoundResult for ${blockchainName}, token: ${tokenAddress}, round: ${roundId}:`,
        error,
      );
      throw error;
    }
  }
}
