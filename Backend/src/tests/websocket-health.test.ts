import { BlockchainService } from '../services/blockchain/BlockchainService';

describe('WebSocket Health Check', () => {
  let blockchainService: BlockchainService;

  beforeEach(() => {
    blockchainService = new BlockchainService();
  });

  afterEach(async () => {
    await blockchainService.cleanup();
  });

  test('should initialize with empty connection status', () => {
    const status = blockchainService.getConnectionStatus();
    expect(status).toEqual({});
  });

  test('should handle force reconnection', async () => {
    const config = {
      rpcUrl: 'wss://sepolia.infura.io/ws/v3/test',
      chainId: 11155111,
      contractAddresses: ['0x1234567890123456789012345678901234567890'],
    };

    blockchainService.addBlockchain('ethereum', config);
    
    // Force reconnection should return a boolean
    const result = await blockchainService.forceReconnect('ethereum');
    expect(typeof result).toBe('boolean');
  });

  test('should handle cleanup properly', async () => {
    const config = {
      rpcUrl: 'wss://sepolia.infura.io/ws/v3/test',
      chainId: 11155111,
      contractAddresses: ['0x1234567890123456789012345678901234567890'],
    };

    blockchainService.addBlockchain('ethereum', config);
    
    // Cleanup should not throw errors
    await expect(blockchainService.cleanup()).resolves.not.toThrow();
  });
});
