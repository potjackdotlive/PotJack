import { useQuery } from "@tanstack/react-query";
import { getBytesEncoder, getProgramDerivedAddress } from "gill";
import { getGetCurrentRaffleRoundIdInstruction, RAFFLE_PROGRAM_ADDRESS } from "anchor/src";
import { QUERY_KEYS } from "constants/queryKeys";
import { useSolanaRpc } from "pages/Play/hooks/useSolanaRpc";
import { getBase64Transaction } from "pages/Play/utils";
import { decodeBase64 } from "utils/decodeBase64";

export const useGetCurrentRaffleRoundIdForSol = (enabled: boolean | undefined = true) => {
  const rpc = useSolanaRpc();

  return useQuery({
    queryKey: [QUERY_KEYS.SOL.CURRENT_RAFFLE_ROUND_ID],
    staleTime: 15_000,
    refetchInterval: 15_000 + Math.random() * 5_000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    queryFn: async () => {
      const solRaffle = await getProgramDerivedAddress({
        programAddress: RAFFLE_PROGRAM_ADDRESS,
        seeds: [getBytesEncoder().encode(new Uint8Array([115, 111, 108, 95, 114, 97, 102, 102, 108, 101]))],
      });

      // @ts-expect-error todo
      const instruction = getGetCurrentRaffleRoundIdInstruction({ solRaffle });

      const base64Transaction = await getBase64Transaction(rpc, instruction);

      if (!base64Transaction) {
        return null;
      }

      const simulation = await rpc
        .simulateTransaction(base64Transaction, {
          commitment: "confirmed",
          encoding: "base64",
          replaceRecentBlockhash: true,
        })
        .send();

      if (simulation.value.returnData?.data && simulation.value.returnData?.data[0]) {
        const roundId = await decodeBase64(simulation.value.returnData.data[0]);
        return Number(roundId);
      } else {
        return 0;
      }
    },
    enabled,
  });
};
