import { AvalancheFujiCoinType } from "utils/enums/tokens/avalancheFujiTokens";
import { Address } from "utils/types";

export const avalancheFujiTokenAddresses: Record<AvalancheFujiCoinType, Address> = {
  [AvalancheFujiCoinType.AVAX]: "0x0000000000000000000000000000000000000000",
};

export const AvalancheFujiAddressToToken: Record<Address, AvalancheFujiCoinType> = {
  ["0x0000000000000000000000000000000000000000"]: AvalancheFujiCoinType.AVAX,
};

export const getAvalancheFujiTokenNameByAddress = (tokenAddress: Address) => {
  switch (tokenAddress) {
    case avalancheFujiTokenAddresses.AVAX:
      return "Avalanche AVAX";
    default:
      return tokenAddress;
  }
};
