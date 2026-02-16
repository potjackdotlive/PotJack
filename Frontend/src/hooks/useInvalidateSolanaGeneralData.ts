import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";

export const useInvalidateSolanaGeneralData = () => {
  const queryClient = useQueryClient();

  return useMemo(
    () => () => {
      queryClient
        .invalidateQueries({
          queryKey: [QUERY_KEYS.SOL.CURRENT_RAFFLE_ROUND_ID],
          exact: false,
        })
        .finally(() => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SOL.GET_BALANCE], exact: false }));
    },
    [],
  );
};
