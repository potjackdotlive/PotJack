import { useChainIds } from "hooks/useChainIds";
import { getCoinsPerChain } from "utils/getCoinsPerChain";
import { ChainIdType } from "utils/types";

type CoinList = string[];

type UseChainCoinSetReturn = Record<ChainIdType, CoinList>;

export const useChainCoinSet = (): UseChainCoinSetReturn => {
  const chainIds = useChainIds();
  const result = {} as UseChainCoinSetReturn;

  chainIds.forEach((id) => {
    result[`${id as ChainIdType}`] = getCoinsPerChain(id);
  });

  return result;
};
