import { OptimismSepoliaCoinType } from "utils/enums/tokens/optimismSepoliaTokens";
import { Address } from "utils/types";

export const optimismSepoliaTokenAddresses: Record<OptimismSepoliaCoinType, Address> = {
  [OptimismSepoliaCoinType.ETH]: "0x0000000000000000000000000000000000000000",
  [OptimismSepoliaCoinType.OP]: "0x4200000000000000000000000000000000000042",
};

export const OptimismSepoliaAddressToToken: Record<Address, OptimismSepoliaCoinType> = {
  ["0x0000000000000000000000000000000000000000"]: OptimismSepoliaCoinType.ETH,
  ["0x4200000000000000000000000000000000000042"]: OptimismSepoliaCoinType.OP,
};

export const getOptimismSepoliaTokenNameByAddress = (tokenAddress: Address) => {
  switch (tokenAddress) {
    case optimismSepoliaTokenAddresses.ETH:
      return "Optimism ETH";
    case optimismSepoliaTokenAddresses.OP:
      return "Optimism OP";
    default:
      return tokenAddress;
  }
};
