import { ArbitrumSepoliaCoinType } from "utils/enums/tokens/arbitrumSepoliaTokens";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { Address } from "utils/types";

export const ArbitrumSepoliaTokenAddresses: Record<ArbitrumSepoliaCoinType, Address> = {
  [SepoliaCoinType.USDC]: "0xC207861d10EC251dB13b3B86448904d91F099B99",
  [SepoliaCoinType.Ethereum]: "0x0000000000000000000000000000000000000000",
};

export const ArbitrumSepoliaAddressToToken: Record<Address, ArbitrumSepoliaCoinType> = {
  ["0xC207861d10EC251dB13b3B86448904d91F099B99"]: ArbitrumSepoliaCoinType.USDC,
  ["0x0000000000000000000000000000000000000000"]: ArbitrumSepoliaCoinType.Ethereum,
};

export const getArbitrumSepoliaTokenNameByAddress = (tokenAddress: Address) => {
  switch (tokenAddress) {
    case ArbitrumSepoliaTokenAddresses.USDC:
      return "ArbitrumSep USDC";
    case ArbitrumSepoliaTokenAddresses.ETH:
      return "ArbitrumSep ETH";
    default:
      return tokenAddress;
  }
};
