import { Connection, PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import { getRoundDecoder, RAFFLE_PROGRAM_ADDRESS } from "anchor/src";
import { QUERY_KEYS } from "constants/queryKeys";
import { useSolanaRpcUrl } from "pages/Play/hooks/useSolanaRpc";
import { u32ToLittleEndianBuffer } from "utils/buffer";

const PROGRAM_ID = new PublicKey(RAFFLE_PROGRAM_ADDRESS);

const getSolRafflePda = () =>
  PublicKey.findProgramAddressSync([Buffer.from("sol_raffle")], new PublicKey(PROGRAM_ID))[0];

const getRoundPda = (roundId: number) => {
  const solRaffle = getSolRafflePda();

  return PublicKey.findProgramAddressSync(
    [Buffer.from("round"), solRaffle.toBuffer(), u32ToLittleEndianBuffer(roundId)],
    new PublicKey(PROGRAM_ID),
  )[0];
};

export const useSolRaffleRound = (roundId?: number) => {
  const rpcUrl = useSolanaRpcUrl();
  const connection = new Connection(rpcUrl, "confirmed");

  return useQuery({
    queryKey: [QUERY_KEYS.SOL.GET_RAFFLE_ROUND, roundId],
    enabled: typeof roundId === "number",
    queryFn: async () => {
      if ((roundId !== 0 && roundId == null) || roundId === -1) {
        throw new Error("Unable to fetch solana round data");
      }

      const roundPda = getRoundPda(roundId);

      try {
        const roundAccountInfo = await connection.getAccountInfo(roundPda);
        const decoder = getRoundDecoder();
        if (roundAccountInfo?.data) {
          return decoder.decode(roundAccountInfo?.data);
        } else {
          return null;
        }
      } catch (err: any) {
        // account wasn't found = round does not exist
        if (err?.message?.includes("Account does not exist")) {
          return null;
        }
        throw err;
      }
    },
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
};
