import { RAFFLE_PROGRAM_ADDRESS } from "anchor/src";
import { Maybe } from "graphql/gen/types";
import {
  ContractAddressArbitrumSepolia,
  ContractAddressAvalancheFuji,
  ContractAddressBaseSepolia,
  ContractAddressBnbSmartChainTestnet,
  ContractAddressOptimismSepolia,
  ContractAddressPolygonAmoy,
  ContractAddressSepolia,
} from "utils/contractAddresses";

export const getNetworkNameByContractAddress = (contractAddress?: Maybe<string>) => {
  switch (true) {
    case contractAddress?.toUpperCase() === ContractAddressSepolia.toUpperCase():
      return "Sepolia";
    case contractAddress?.toUpperCase() === ContractAddressArbitrumSepolia.toUpperCase():
      return "ArbitrumSep";
    case contractAddress?.toUpperCase() === ContractAddressPolygonAmoy.toUpperCase():
      return "Polygon";
    case contractAddress?.toUpperCase() === ContractAddressOptimismSepolia.toUpperCase():
      return "Optimism";
    case contractAddress?.toUpperCase() === ContractAddressBaseSepolia.toUpperCase():
      return "Base";
    case contractAddress?.toUpperCase() === ContractAddressAvalancheFuji.toUpperCase():
      return "Avalanche";
    case contractAddress?.toUpperCase() === ContractAddressBnbSmartChainTestnet.toUpperCase():
      return "BNB";
    case contractAddress === RAFFLE_PROGRAM_ADDRESS:
      return "Solana";
    default:
      return "";
  }
};
