import { SEPOLIA_ARBITRUM_CHAIN_ID } from "utils/constants/chainsConstants";

export const checkIsArbitrum = (chainId: number | string) => {
  if (!chainId) {
    return false;
  }

  // todo: prod arbitrum
  return [SEPOLIA_ARBITRUM_CHAIN_ID].includes(Number(chainId));
};
