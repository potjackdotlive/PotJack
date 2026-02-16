import { BnbCoinType } from "utils/enums/tokens/bnbTestnetTokens";
import { Address } from "utils/types";

export const bnbSepoliaTokenAddresses: Record<BnbCoinType, Address> = {
  [BnbCoinType.BNB]: "0x0000000000000000000000000000000000000000",
  [BnbCoinType.BUSD]: "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7",
};

export const bnbSepoliaAddressToToken: Record<Address, BnbCoinType> = {
  ["0x0000000000000000000000000000000000000000"]: BnbCoinType.BNB,
  ["0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"]: BnbCoinType.BUSD,
};

export const getBnbTestnetTokenNameByAddress = (tokenAddress: Address) => {
  switch (tokenAddress) {
    case bnbSepoliaTokenAddresses.BNB:
      return "BNB";
    case bnbSepoliaTokenAddresses.BUSD:
      return "BUSD";
    default:
      return tokenAddress;
  }
};
