declare namespace NodeJS {
  export interface ProcessEnv {
    PRIVATE_KEY: string;
    ETHEREUM_SEPOLIA_RPC_URL: string;
    ARBITRUM_SEPOLIA_RPC_URL: string;
    POLYGON_AMOY_RPC_URL: string;
    OPTIMISM_SEPOLIA_RPC_URL: string;
    AVALANCHE_FUJI_RPC_URL: string;
    BNB_TESTNET_RPC_URL: string;
    BASE_SEPOLIA_RPC_URL: string;
    ETHERSCAN_API_KEY: string;
  }
}