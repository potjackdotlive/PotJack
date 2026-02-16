import { useChains } from "wagmi";
import { SOLANA_CHAIN_ID } from "utils/constants/chainsConstants";
import { ChainIdType } from "utils/types";

export const useChainIds = (): ChainIdType[] => {
  const chains = useChains();

  const ethereumIds = chains.map((chain) => chain.id as ChainIdType);

  return [...ethereumIds, SOLANA_CHAIN_ID];
};
