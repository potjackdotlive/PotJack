import { getAddress } from "ethers";
import { Address } from "viem";
import {
  ContractAddressArbitrumSepolia,
  ContractAddressAvalancheFuji,
  ContractAddressBaseSepolia,
  ContractAddressBnbSmartChainTestnet,
  ContractAddressOptimismSepolia,
  ContractAddressPolygonAmoy,
  ContractAddressSepolia
} from "utils/contractAddresses";
import { getArbitrumSepoliaTokenNameByAddress } from "utils/enums/addresses/arbitrumSepoliaTokenAddresses";
import { getAvalancheFujiTokenNameByAddress } from "utils/enums/addresses/avalancheFujiTokenAddresses";
import { getBaseSepoliaTokenNameByAddress } from "utils/enums/addresses/baseSepoliaTokenAddresses";
import { getBnbTestnetTokenNameByAddress } from "utils/enums/addresses/bnbSepoliaTokenAddresses";
import { getOptimismSepoliaTokenNameByAddress } from "utils/enums/addresses/optimismSepoliaTokenAddresses";
import { getPolygonAmoyTokenNameByAddress } from "utils/enums/addresses/polygonAmoyTokenAddresses";
import { getSepoliaTokenNameByAddress } from "utils/enums/addresses/sepoliaTokenAddresses";

export const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isYesterday = (date: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const getDateGroupLabel = (date: Date) => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return formatDate(date);
};

type GetTokenNameByContractAndTokenAddressProps = { contractAddress: Address; tokenAddress: Address };

// todo: mainnet
export const getTokenNameByContractAndTokenAddresses = ({
  tokenAddress,
  contractAddress,
}: GetTokenNameByContractAndTokenAddressProps) => {
  switch (getAddress(contractAddress)) {
    case ContractAddressSepolia:
      return getSepoliaTokenNameByAddress(tokenAddress);
    case ContractAddressArbitrumSepolia:
      return getArbitrumSepoliaTokenNameByAddress(tokenAddress);
    case ContractAddressPolygonAmoy:
      return getPolygonAmoyTokenNameByAddress(tokenAddress);
    case ContractAddressOptimismSepolia:
      return getOptimismSepoliaTokenNameByAddress(tokenAddress);
    case ContractAddressAvalancheFuji:
      return getAvalancheFujiTokenNameByAddress(tokenAddress);
    case ContractAddressBnbSmartChainTestnet:
      return getBnbTestnetTokenNameByAddress(tokenAddress);
    case ContractAddressBaseSepolia:
      return getBaseSepoliaTokenNameByAddress(tokenAddress);
    default:
      return tokenAddress;
  }
};
