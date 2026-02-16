import { useSyncExternalStore } from "react";
import { getSnapshot, subscribe } from "./globalTicker";

export function useGlobalNow(): number {
  return useSyncExternalStore(subscribe, getSnapshot);
}
