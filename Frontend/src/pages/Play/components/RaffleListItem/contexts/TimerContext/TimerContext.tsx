import { FC, PropsWithChildren } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { useTimeTillMidnightOrMiddayNYC } from "hooks/api/useTimeTillMidnightOrMiddayNYC";
import { useCountdownTimer } from "pages/Play/components/RaffleListItem/contexts/TimerContext/useCountdownTimer";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";

type Props = {
  endTime?: number | null;
  active?: boolean;
  onComplete?: () => void;
  showOnlyCurrentRound?: boolean;
};

const pad = (n: number) => String(n).padStart(2, "0");

export const TimerContext: FC<PropsWithChildren<Props>> = ({ showOnlyCurrentRound }) => {
  const { roundEndTime, setCoin, setRoundEndTime, roundId, maxRoundForCoin } = usePlayContext();
  const queryClient = useQueryClient();
  const endTime = useTimeTillMidnightOrMiddayNYC(true);

  const { duration } = useCountdownTimer(roundEndTime || new Date().getTime(), () => {
    if (roundEndTime === null) {
      return;
    }

    setCoin(null);
    setRoundEndTime(endTime);

    const invalidate = () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ABI.GET_RAFFLE_ROUND_DATA], exact: false });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ABI.GET_LAST_ROUNDS], exact: false });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SOL.CURRENT_RAFFLE_ROUND_ID], exact: false });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SOL.GET_RAFFLE_ROUND_DATA], exact: false });
    };

    invalidate();
    setTimeout(invalidate, 5000);
  });

  const h = (duration.hours ?? 0) + (duration.days ?? 0) * 24;
  const m = duration.minutes ?? 0;
  const s = duration.seconds ?? 0;

  const formatted = `${pad(h)}:${pad(m)}:${pad(s)}`;

  if (showOnlyCurrentRound) {
    return <>{formatted}</>;
  }

  return <>{maxRoundForCoin === roundId ? formatted : "00:00:00"}</>;
};
