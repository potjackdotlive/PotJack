import { useEffect, useRef } from "react";
import { intervalToDuration } from "date-fns";
import { useGlobalNow } from "./useGlobalNow";

export function useCountdownTimer(endTimestamp: number, onEnd?: () => void) {
  const now = useGlobalNow();
  const remaining = endTimestamp - now || null;

  const calledRef = useRef(false);

  useEffect(() => {
    if (remaining && remaining <= 0 && !calledRef.current) {
      calledRef.current = true;
      onEnd?.();
    }
  }, [remaining, onEnd]);

  const duration = intervalToDuration({
    start: 0,
    end: remaining || 0,
  });

  return {
    total: remaining,
    duration,
  };
}
