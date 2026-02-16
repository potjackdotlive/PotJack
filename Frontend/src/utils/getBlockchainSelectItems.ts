import { DefaultOptionType } from "antd/es/select";
import {
  AVALANCHE_FUJI_TESTNET_ID,
  BASE_SEPOLIA_TESTNET_ID,
  BNB_SMART_CHAIN_TESTNET_ID,
  OPTIMISM_SEPOLIA_TESTNET_ID,
  POLYGON_AMOY_TESTNET_ID,
  SEPOLIA_ARBITRUM_CHAIN_ID,
  SEPOLIA_CHAIN_ID,
  SOLANA_CHAIN_ID,
} from "utils/constants/chainsConstants";

// todo: change to mainnet on prod
export const getBlockchainSelectItems = (): DefaultOptionType[] => [
  { value: SEPOLIA_CHAIN_ID, label: "Sepolia" },
  { value: SEPOLIA_ARBITRUM_CHAIN_ID, label: "ArbitrumSep" },
  { value: SOLANA_CHAIN_ID, label: "Solana" },
  { value: POLYGON_AMOY_TESTNET_ID, label: "Polygon" },
  { value: OPTIMISM_SEPOLIA_TESTNET_ID, label: "Optimism" },
  { value: AVALANCHE_FUJI_TESTNET_ID, label: "Avalanche" },
  { value: BNB_SMART_CHAIN_TESTNET_ID, label: "BNB" },
  { value: BASE_SEPOLIA_TESTNET_ID, label: "Base" },
];
