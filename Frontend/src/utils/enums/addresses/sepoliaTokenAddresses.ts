import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { Address } from "utils/types";

export const SepoliaTokenAddresses: Record<SepoliaCoinType, Address> = {
  [SepoliaCoinType.USDC]: "0x73d219B3881E481394DA6B5008A081d623992200",
  [SepoliaCoinType.DAI]: "0x776b6fC2eD15D6Bb5Fc32e0c89DE68683118c62A",
  [SepoliaCoinType.Ethereum]: "0x0000000000000000000000000000000000000000",
};

export const SepoliaAddressToToken: Record<Address, SepoliaCoinType> = {
  ["0x73d219B3881E481394DA6B5008A081d623992200"]: SepoliaCoinType.USDC,
  ["0x776b6fC2eD15D6Bb5Fc32e0c89DE68683118c62A"]: SepoliaCoinType.DAI,
  ["0x0000000000000000000000000000000000000000"]: SepoliaCoinType.Ethereum,
};

export const getSepoliaTokenNameByAddress = (tokenAddress: Address) => {
  switch (tokenAddress) {
    case SepoliaTokenAddresses.USDC:
      return "Sepolia USDC";
    case SepoliaTokenAddresses.DAI:
      return "Sepolia DAI";
    case SepoliaTokenAddresses.ETH:
      return "Sepolia ETH";
    default:
      return tokenAddress;
  }
};
