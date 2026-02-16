import { RAFFLE_PROGRAM_ADDRESS } from "anchor/src";
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
import {
  ContractAddressArbitrumSepolia,
  ContractAddressAvalancheFuji,
  ContractAddressBaseSepolia,
  ContractAddressBnbSmartChainTestnet,
  ContractAddressOptimismSepolia,
  ContractAddressPolygonAmoy,
  ContractAddressSepolia,
} from "utils/contractAddresses";

export const getChainIdByContractAddress = (contractAddress: string): number => {
  switch (contractAddress) {
    case ContractAddressSepolia:
      return SEPOLIA_CHAIN_ID;
    case ContractAddressArbitrumSepolia:
      return SEPOLIA_ARBITRUM_CHAIN_ID;
    case ContractAddressPolygonAmoy:
      return POLYGON_AMOY_TESTNET_ID;
    case ContractAddressOptimismSepolia:
      return OPTIMISM_SEPOLIA_TESTNET_ID;
    case ContractAddressAvalancheFuji:
      return AVALANCHE_FUJI_TESTNET_ID;
    case ContractAddressBnbSmartChainTestnet:
      return BNB_SMART_CHAIN_TESTNET_ID;
    case ContractAddressBaseSepolia:
      return BASE_SEPOLIA_TESTNET_ID;
    case RAFFLE_PROGRAM_ADDRESS:
      return SOLANA_CHAIN_ID;
    default:
      return 0;
  }
};
