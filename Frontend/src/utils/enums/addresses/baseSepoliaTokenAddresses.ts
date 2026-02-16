import { BaseSepoliaCoinType } from "utils/enums/tokens/baseSepoliaTokens";
import { Address } from "utils/types";

export const baseSepoliaTokenAddresses: Record<BaseSepoliaCoinType, Address> = {
  [BaseSepoliaCoinType.ETH]: "0x0000000000000000000000000000000000000000",
};

export const BaseSepoliaAddressToToken: Record<Address, BaseSepoliaCoinType> = {
  ["0x0000000000000000000000000000000000000000"]: BaseSepoliaCoinType.ETH,
};

export const getBaseSepoliaTokenNameByAddress = (tokenAddress: Address) => {
  switch (tokenAddress) {
    case baseSepoliaTokenAddresses.ETH:
      return "Base ETH";
    default:
      return tokenAddress;
  }
};
