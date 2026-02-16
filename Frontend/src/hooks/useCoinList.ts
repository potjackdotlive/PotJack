import { useMemo } from "react";
import { getCoinsPerChain } from "utils/getCoinsPerChain";
import { ChainIdType, CoinType } from "utils/types";

export const useCoinList = (chainId: ChainIdType | null): CoinType[] =>
  useMemo(() => {
    if (!chainId) return [];

    return getCoinsPerChain(chainId);
  }, [chainId]);
