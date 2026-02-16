import { createContext, useContext } from "react";
import { noop } from "utils/noop";
import { ChainIdType, CoinType, Nullable } from "utils/types";

export type SetRoundDataProps = { maxRoundForCoin?: number; active?: boolean; roundId: number | null };

export type PlayContextProps = {
  maxRoundForCoin: Nullable<number>;
  active: boolean;
  coin: Nullable<CoinType>;
  setCoin: (blockchain: Nullable<CoinType>) => void;
  networkId: Nullable<ChainIdType>;
  setNetworkId: (blockchain: Nullable<ChainIdType>) => void;
  roundId: Nullable<number>;
  setRoundData: (roundData: SetRoundDataProps) => void;
  roundEndTime: Nullable<number>;
  setRoundEndTime: (roundEndTime: Nullable<number>) => void;
};

const defaultValues: PlayContextProps = {
  maxRoundForCoin: null,
  active: false,
  roundId: null,
  setRoundData: noop,
  coin: null,
  setCoin: noop,
  networkId: null,
  setNetworkId: noop,
  roundEndTime: null,
  setRoundEndTime: noop,
};

const playContextUtils = createContext<PlayContextProps>(defaultValues);
export const usePlayContext = () => useContext<PlayContextProps>(playContextUtils);
export const PlayContextProvider = playContextUtils.Provider;
