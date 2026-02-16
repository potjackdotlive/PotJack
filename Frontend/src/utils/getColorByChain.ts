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
import { ChainIdType } from "utils/types";

export const getColorByChain = (chainId: ChainIdType | string | null): string => {
  switch (Number(chainId)) {
    case POLYGON_AMOY_TESTNET_ID:
      return "#C084FC";
    case OPTIMISM_SEPOLIA_TESTNET_ID:
      return "#EF4444";
    case AVALANCHE_FUJI_TESTNET_ID:
      return "#F472B6";
    case BNB_SMART_CHAIN_TESTNET_ID:
      return "#FACC15";
    case BASE_SEPOLIA_TESTNET_ID:
      return "#38BDF8";
    case SEPOLIA_CHAIN_ID:
      return "#22D3EE";
    case SEPOLIA_ARBITRUM_CHAIN_ID:
      return "#60A5FA";
    case SOLANA_CHAIN_ID:
      return "#34D399";
    default:
      return "";
  }
};
