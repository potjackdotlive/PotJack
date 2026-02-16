import { useEffect, useMemo } from "react";
import { isPast } from "date-fns";
import { useTimeTillMidnightOrMiddayNYC } from "hooks/api/useTimeTillMidnightOrMiddayNYC";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { ChainIdType, CoinType } from "utils/types";
import { RaffleRoundResult } from "./useRaffleRoundsAllNetworks";

type Props = {
  raffleRounds: Record<ChainIdType, Record<CoinType, RaffleRoundResult>>;
};

export const useEndTime = ({ raffleRounds }: Props) => {
  const { setRoundEndTime } = usePlayContext();

  const foundEndTime = useMemo(() => {
    let endTime: null | number = null;
    Object.entries(raffleRounds).forEach(([_, entries]) =>
      Object.entries(entries).forEach((ent) => {
        const coinData = ent[1];
        if (coinData?.round?.active && coinData?.round?.endTime && !isPast(coinData?.round?.endTime)) {
          endTime = coinData.round.endTime;
        }
      }),
    );
    return endTime;
  }, [raffleRounds]);

  const endTime = useTimeTillMidnightOrMiddayNYC(!foundEndTime);

  useEffect(() => {
    if (foundEndTime) {
      setRoundEndTime(foundEndTime);
      return;
    }

    if (endTime) {
      setRoundEndTime(endTime);
      return;
    }
  }, [foundEndTime, endTime]);
};
