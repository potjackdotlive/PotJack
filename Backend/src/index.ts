import 'reflect-metadata';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

import {ApolloServer} from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import {ChainConfig} from './config/blockchainConfig.type';
import {AppDataSource} from './config/database';
import {resolvers, setBlockchainService, setSwitchboardService} from './resolvers';
import {BlockchainService} from './services/blockchain/BlockchainService';
import {SwitchboardService} from './services/prices/SwitchboardService';
import {CleanupService} from './services/cleanup/CleanupService';
import logger from './utils/logger';

// Load environment variables
dotenv.config();

// Initialize the express application
const app = express();

// Configure CORS
app.use((req, res, next) => {
  console.log('ORIGIN' + req.headers.origin); // Log incoming request origin
  next();
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? [process.env.CORS_ORIGIN]
      : ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'https://stage.lottery.utest.pro'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers'
    ],
    credentials: true,
  }),
);

// Add endpoint to serve the GraphQL schema
app.get('/schema', (req, res) => {
  try {
    const schema = readFileSync('./schema.graphql', {encoding: 'utf-8'});
    res.type('text/plain').send(schema);
  } catch (error) {
    logger.error('Error serving schema file:', error);
    res.status(500).send('Error loading schema');
  }
});

const typeDefs = readFileSync('./schema.graphql', {encoding: 'utf-8'});

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req}),
});

let blockchainServiceInstance: BlockchainService | null = null;

// Start the server
async function startServer() {
  // Initialize database connection
  try {
    await AppDataSource.initialize();
    logger.info('Database connection established');
  } catch (error) {
    logger.error('Error connecting to database:', error);
    process.exit(1);
  }

  // Start Apollo Server
  await server.start();
  server.applyMiddleware({app: app as any});

  // Load blockchain configuration from path specified in .env or use default
  const blockchainConfigPath =
    process.env.BLOCKCHAIN_CONFIG_PATH || './src/config/blockchain-config.json';
  let blockchainConfig: { blockchains: ChainConfig[]; syncThresholdBlocks?: number };
  try {
    const configFile = readFileSync(join(process.cwd(), blockchainConfigPath), {
      encoding: 'utf-8',
    });
    blockchainConfig = JSON.parse(configFile);
    logger.info(`Loaded blockchain configuration from ${blockchainConfigPath}`);
  } catch (error) {
    logger.error(`Failed to load blockchain configuration from ${blockchainConfigPath}:`, error);
    process.exit(1);
  }

  if (process.env.DISABLE_BLOCKCHAIN_SYNC !== 'true') {

    if (process.env.NODE_ENV !== 'development') {
      await new CleanupService().clean()
    }

    // Initialize blockchain service
    const blockchainService = new BlockchainService();
    blockchainServiceInstance = blockchainService;

    // Set sync threshold from configuration
    if (blockchainConfig.syncThresholdBlocks) {
      blockchainService.setSyncThreshold(blockchainConfig.syncThresholdBlocks);
    }

    // Set blockchain service in resolvers for monitoring
    setBlockchainService(blockchainService);

    // Initialize switchboard service
    const switchboardService = new SwitchboardService();

    // Set switchboard service in resolvers
    setSwitchboardService(switchboardService);

    // Add blockchains from configuration file
    for (const blockchain of blockchainConfig.blockchains) {
      if (blockchain.contractAddresses.length > 0) {
        blockchainService.addBlockchain(blockchain.name, blockchain);
      }
    }

    // Start listening for blockchain events
    await blockchainService.startListening();
  }

  // Start the express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Handle errors
process.on('unhandledRejection', error => {
  logger.error('Unhandled rejection:', error);
});

process.on('SIGINT', async () => {
  logger.info('Received SIGINT, shutting down gracefully...');

  if (blockchainServiceInstance) {
    await blockchainServiceInstance.cleanup();
  }

  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('Received SIGTERM, shutting down gracefully...');

  if (blockchainServiceInstance) {
    await blockchainServiceInstance.cleanup();
  }

  process.exit(0);
});

// Start the server
startServer().catch(error => {
  logger.error('Error starting server:', error);
});
