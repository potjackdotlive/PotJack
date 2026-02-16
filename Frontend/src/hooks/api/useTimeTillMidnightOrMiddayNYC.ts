import { useMemo } from "react";
import { addSeconds } from "date-fns";
import { useGetServerTimeQuery } from "graphql/gen/hooks";

function calculateSecondsUntilMidnightOrMidday(utcTimeIso: string): number {
  const utcTime = new Date(utcTimeIso);

  const nycTimeString = utcTime.toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour12: false,
  });

  // Parse the NYC time components
  const nycTime = new Date(nycTimeString);
  const currentHour = nycTime.getHours();
  const currentMinute = nycTime.getMinutes();
  const currentSecond = nycTime.getSeconds();

  let targetHour: number;
  if (currentHour < 12) {
    targetHour = 12;
  } else {
    targetHour = 24;
  }

  const hoursUntilTarget = targetHour - currentHour - 1;
  const minutesUntilTarget = 59 - currentMinute;
  const secondsUntilTarget = 60 - currentSecond;

  let finalHours = hoursUntilTarget;
  let finalMinutes = minutesUntilTarget;
  let finalSeconds = secondsUntilTarget;

  if (finalSeconds === 60) {
    finalSeconds = 0;
    finalMinutes += 1;
  }

  if (finalMinutes === 60) {
    finalMinutes = 0;
    finalHours += 1;
  }

  const secondsTillMiddayOrMidnight = finalHours * 3600 + finalMinutes * 60 + finalSeconds;

  return addSeconds(new Date(), secondsTillMiddayOrMidnight).getTime();
}

export function useTimeTillMidnightOrMiddayNYC(enabled: boolean) {
  const { data } = useGetServerTimeQuery({
    fetchPolicy: "no-cache",
    pollInterval: 60_000,
    initialFetchPolicy: "no-cache",
    skip: !enabled,
  });

  const dataIso = data?.serverTime.iso;

  return useMemo(() => {
    if (!dataIso) return null;
    return calculateSecondsUntilMidnightOrMidday(dataIso);
  }, [dataIso]);
}
