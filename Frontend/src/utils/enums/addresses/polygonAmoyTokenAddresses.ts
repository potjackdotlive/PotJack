import { PolygonAmoyCoinType } from "utils/enums/tokens/polygonAmoyTokens";
import { Address } from "utils/types";

export const PolygonAmoyTokenAddresses: Record<PolygonAmoyCoinType, Address> = {
  [PolygonAmoyCoinType.USDC]: "0x8B0180f2101c8260d49339abfEe87927412494B4",
};

export const PolygonAmoyAddressToToken: Record<Address, PolygonAmoyCoinType> = {
  ["0x8B0180f2101c8260d49339abfEe87927412494B4"]: PolygonAmoyCoinType.USDC,
};

export const getPolygonAmoyTokenNameByAddress = (tokenAddress: Address) => {
  switch (tokenAddress) {
    case PolygonAmoyTokenAddresses.USDC:
      return "Polygon USDC";
    default:
      return tokenAddress;
  }
};
