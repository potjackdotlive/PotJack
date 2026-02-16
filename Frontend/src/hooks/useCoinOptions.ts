import { useMemo } from "react";
import { CoinType } from "utils/types";

export const useCoinOptions = (coinList: CoinType[]) =>
  useMemo(
    () =>
      coinList.map((coin) => ({
        value: coin,
        label: coin,
      })),
    [coinList],
  );
