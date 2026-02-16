import { FC, PropsWithChildren, useEffect, useState } from "react";
import {
  PlayContextProps,
  PlayContextProvider,
  SetRoundDataProps,
} from "pages/Play/contexts/playContext/playContextUtils";
import { useLastRounds } from "pages/Play/hooks/useLastRounds";
import { ChainIdType, CoinType, Nullable } from "utils/types";

type Props = PropsWithChildren & {
  coin: Nullable<CoinType>;
  networkId: Nullable<ChainIdType>;
};

export const PlayContext: FC<Props> = ({ children, coin, networkId }) => {
  const { data, isLoading } = useLastRounds();
  const [state, setState] = useState<
    Pick<PlayContextProps, "coin" | "roundId" | "maxRoundForCoin" | "active" | "networkId" | "roundEndTime">
  >({
    roundId: null,
    maxRoundForCoin: null,
    active: false,
    coin,
    networkId,
    roundEndTime: null,
  });

  const setCoin = (coin: CoinType | null) => {
    setState((prevState) => ({ ...prevState, coin }));
  };

  const setNetworkId = (networkId: ChainIdType | null) => {
    setState((prevState) => ({ ...prevState, networkId }));
  };

  const setRoundData = ({ roundId, maxRoundForCoin, active }: SetRoundDataProps) => {
    setState((prevState) => ({
      ...prevState,
      roundId,
      maxRoundForCoin: maxRoundForCoin === undefined ? prevState.maxRoundForCoin : maxRoundForCoin,
      active: active === undefined ? prevState.active : active,
    }));
  };

  const setRoundEndTime = (roundEndTime: number | null) => {
    setState((prevState) => ({ ...prevState, roundEndTime }));
  };

  useEffect(() => {
    if (!isLoading && networkId && coin && !!data[networkId] && !!data[networkId][coin]) {
      setRoundData({
        roundId: state?.roundId || data[networkId]?.[coin].actualRoundId,
        maxRoundForCoin: data[networkId]?.[coin].actualRoundId,
        active: data[networkId]?.[coin].active,
      });
    }
  }, [coin, networkId, isLoading, state]);

  return (
    <PlayContextProvider
      value={{
        ...state,
        setNetworkId,
        setCoin,
        setRoundData,
        setRoundEndTime,
      }}
    >
      {children}
    </PlayContextProvider>
  );
};
