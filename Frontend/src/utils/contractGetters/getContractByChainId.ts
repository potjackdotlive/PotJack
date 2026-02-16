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
import { getArbitrumRaffleContract } from "utils/contractGetters/mainnet/getArbitrumRaffleContract";
import { getAvalancheRaffleContract } from "utils/contractGetters/mainnet/getAvalancheRaffleContract";
import { getEthereumRaffleContract } from "utils/contractGetters/mainnet/getEthereumRaffleContract";
import { geOptimismRaffleContract, OptimismRaffleContract } from "utils/contractGetters/mainnet/getOptimismContract";
import { getPolygonRaffleContract } from "utils/contractGetters/mainnet/getPolygonRaffleContract";
import {
  ArbitrumRaffleContract,
  getArbitrumSepoliaRaffleContract,
} from "utils/contractGetters/testnet/getArbitrumSepoliaRaffleContract";
import { getAvalancheFujiRaffleContract } from "utils/contractGetters/testnet/getAvalancheFujiRaffleContract";
import { getBaseSepoliaRaffleContract } from "utils/contractGetters/testnet/getBaseSepoliaContract";
import { getBnbSepoliaRaffleContract } from "utils/contractGetters/testnet/getBnbSepoliaRaffleContract";
import { getOptimismSepoliaRaffleContract } from "utils/contractGetters/testnet/getOptimismRaffleContract";
import { getPolygonAmoyRaffleContract } from "utils/contractGetters/testnet/getPolygonAmoyRaffleContract";
import {
  getSepoliaRaffleContract,
  SepoliaRaffleContract,
} from "utils/contractGetters/testnet/getSepoliaRaffleContract";
import { ChainIdType } from "utils/types";

export const getContractByChainId = (
  chainId: ChainIdType | number | null,
): SepoliaRaffleContract | ArbitrumRaffleContract | OptimismRaffleContract | null => {
  if (!chainId) return null;

  switch (true) {
    // mainnet
    case chainId == ETHEREUM_MAINNET_CHAIN_ID:
      return getEthereumRaffleContract();
    case chainId == ARBITRUM_MAINNET_CHAIN_ID:
      return getArbitrumRaffleContract();
    case chainId == POLYGON_MAINNET_CHAIN_ID:
      return getPolygonRaffleContract();
    case chainId == OPTIMISM_MAINNET_CHAIN_ID:
      return geOptimismRaffleContract();
    case chainId == AVALANCHE_MAINNET_CHAIN_ID:
      return getAvalancheRaffleContract();
    case chainId == BNB_MAINNET_CHAIN_ID:
      // todo: mainnet
      return getBnbSepoliaRaffleContract();
    case chainId == BASE_MAINNET_CHAIN_ID:
      return getBaseSepoliaRaffleContract();
    // testnet
    case chainId == SEPOLIA_CHAIN_ID:
      return getSepoliaRaffleContract();
    case chainId == SEPOLIA_ARBITRUM_CHAIN_ID:
      return getArbitrumSepoliaRaffleContract();
    case chainId == POLYGON_AMOY_TESTNET_ID:
      return getPolygonAmoyRaffleContract();
    case chainId == OPTIMISM_SEPOLIA_TESTNET_ID:
      return getOptimismSepoliaRaffleContract();
    case chainId == AVALANCHE_FUJI_TESTNET_ID:
      return getAvalancheFujiRaffleContract();
    case chainId == BNB_SMART_CHAIN_TESTNET_ID:
      return getBnbSepoliaRaffleContract();
    case chainId == BASE_SEPOLIA_TESTNET_ID:
      return getBaseSepoliaRaffleContract();
    default:
      return null;
  }
};
