export interface ChainConfig {
  name: string;
  rpcUrl: string;
  chainId: number;
  contractAddresses: string[];
  confirmationBlocks?: number;
  extra?: Record<string, any>;
}

export interface BlockchainConfig {
  syncThresholdBlocks?: number;
  blockchains: ChainConfig[];
}
