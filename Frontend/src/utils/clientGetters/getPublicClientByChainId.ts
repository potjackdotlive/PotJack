import { getArbitrumPublicClient } from "utils/clientGetters/mainnet/getArbitrumPublicClient";
import { getAvalanchePublicClient } from "utils/clientGetters/mainnet/getAvalanchePublicClient";
import { getBasePublicClient } from "utils/clientGetters/mainnet/getBasePublicClient";
import { getBnbPublicClient } from "utils/clientGetters/mainnet/getBnbPublicClient";
import { getEthereumPublicClient } from "utils/clientGetters/mainnet/getEthereumPublicClient";
import { getOptimismPublicClient } from "utils/clientGetters/mainnet/getOptimismPublicClient";
import { getPolygonPublicClient } from "utils/clientGetters/mainnet/getPolygonPublicClient";
import { getArbitrumSepoliaPublicClient } from "utils/clientGetters/testnet/getArbitrumSepoliaPublicClient";
import { getAvalancheFujiPublicClient } from "utils/clientGetters/testnet/getAvalancheFujiPublicClient";
import { getBaseSepoliaPublicClient } from "utils/clientGetters/testnet/getBaseSepoliaPublicClient";
import { getBnbTestnetPublicClient } from "utils/clientGetters/testnet/getBnbTestnetPublicClient";
import { getOptimismSepoliaPublicClient } from "utils/clientGetters/testnet/getOptimismSepoliaPublicClient";
import { getPolygonAmoyPublicClient } from "utils/clientGetters/testnet/getPolygonAmoyPublicClient";
import { getSepoliaPublicClient } from "utils/clientGetters/testnet/getSepoliaPublicClient";
import {
  ARBITRUM_MAINNET_CHAIN_ID,
  AVALANCHE_FUJI_TESTNET_ID,
  AVALANCHE_MAINNET_CHAIN_ID,
  BASE_MAINNET_CHAIN_ID,
  BASE_SEPOLIA_TESTNET_ID,
  BNB_MAINNET_CHAIN_ID,
  BNB_SMART_CHAIN_TESTNET_ID,
  ETHEREUM_MAINNET_CHAIN_ID,
  OPTIMISM_MAINNET_CHAIN_ID,
  OPTIMISM_SEPOLIA_TESTNET_ID,
  POLYGON_AMOY_TESTNET_ID,
  POLYGON_MAINNET_CHAIN_ID,
  SEPOLIA_ARBITRUM_CHAIN_ID,
  SEPOLIA_CHAIN_ID,
} from "utils/constants/chainsConstants";
import { ChainIdType } from "utils/types";

export const getPublicClientByChainId = (chainId: ChainIdType | null | number | string) => {
  switch (Number(chainId)) {
    // mainnet
    case ETHEREUM_MAINNET_CHAIN_ID:
      return getEthereumPublicClient();
    case ARBITRUM_MAINNET_CHAIN_ID:
      return getArbitrumPublicClient();
    case POLYGON_MAINNET_CHAIN_ID:
      return getPolygonPublicClient();
    case OPTIMISM_MAINNET_CHAIN_ID:
      return getOptimismPublicClient();
    case AVALANCHE_MAINNET_CHAIN_ID:
      return getAvalanchePublicClient();
    case BNB_MAINNET_CHAIN_ID:
      return getBnbPublicClient();
    case BASE_MAINNET_CHAIN_ID:
      return getBasePublicClient();
    // testnet
    case SEPOLIA_CHAIN_ID:
      return getSepoliaPublicClient();
    case SEPOLIA_ARBITRUM_CHAIN_ID:
      return getArbitrumSepoliaPublicClient();
    case POLYGON_AMOY_TESTNET_ID:
      return getPolygonAmoyPublicClient();
    case OPTIMISM_SEPOLIA_TESTNET_ID:
      return getOptimismSepoliaPublicClient();
    case AVALANCHE_FUJI_TESTNET_ID:
      return getAvalancheFujiPublicClient();
    case BNB_SMART_CHAIN_TESTNET_ID:
      return getBnbTestnetPublicClient();
    case BASE_SEPOLIA_TESTNET_ID:
      return getBaseSepoliaPublicClient();
    default:
      return null;
  }
};
