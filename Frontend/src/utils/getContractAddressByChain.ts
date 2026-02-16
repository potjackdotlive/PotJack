import { RAFFLE_PROGRAM_ADDRESS } from "anchor/src";
import { Maybe } from "graphql/gen/types";
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
import { ChainIdType } from "utils/types";

// todo: mainnet
export const getContractAddressByChain = (id: Maybe<ChainIdType | string>) => {
  switch (true) {
    case Number(id) === SEPOLIA_CHAIN_ID:
      return ContractAddressSepolia;
    case Number(id) === SEPOLIA_ARBITRUM_CHAIN_ID:
      return ContractAddressArbitrumSepolia;
    case Number(id) === POLYGON_AMOY_TESTNET_ID:
      return ContractAddressPolygonAmoy;
    case Number(id) === OPTIMISM_SEPOLIA_TESTNET_ID:
      return ContractAddressOptimismSepolia;
    case Number(id) === BNB_SMART_CHAIN_TESTNET_ID:
      return ContractAddressBnbSmartChainTestnet;
    case Number(id) === BASE_SEPOLIA_TESTNET_ID:
      return ContractAddressBaseSepolia;
    case Number(id) === AVALANCHE_FUJI_TESTNET_ID:
      return ContractAddressAvalancheFuji;
    case Number(id) === SOLANA_CHAIN_ID:
      return RAFFLE_PROGRAM_ADDRESS;
    default:
      return "";
  }
};
