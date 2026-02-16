import {
  AVALANCHE_FUJI_TESTNET_ID,
  BASE_SEPOLIA_TESTNET_ID,
  BNB_SMART_CHAIN_TESTNET_ID,
  ETHEREUM_MAINNET_CHAIN_ID,
  OPTIMISM_SEPOLIA_TESTNET_ID,
  POLYGON_AMOY_TESTNET_ID,
  SEPOLIA_ARBITRUM_CHAIN_ID,
  SEPOLIA_CHAIN_ID,
  SOLANA_CHAIN_ID,
} from "utils/constants/chainsConstants";
import { ChainIdType } from "utils/types";

export const getChainNameById = (id: ChainIdType | string | null): string => {
  switch (Number(id)) {
    case ETHEREUM_MAINNET_CHAIN_ID:
      return "Ethereum";
    case SEPOLIA_CHAIN_ID:
      return "Sepolia";
    case SEPOLIA_ARBITRUM_CHAIN_ID:
      return "ArbitrumSep";
    case SOLANA_CHAIN_ID:
      return "Solana";
    case POLYGON_AMOY_TESTNET_ID:
      return "Polygon";
    case OPTIMISM_SEPOLIA_TESTNET_ID:
      return "Optimism";
    case AVALANCHE_FUJI_TESTNET_ID:
      return "Avalanche";
    case BNB_SMART_CHAIN_TESTNET_ID:
      return "BNB";
    case BASE_SEPOLIA_TESTNET_ID:
      return "Base";
    default:
      return `${id || ""}`;
  }
};
