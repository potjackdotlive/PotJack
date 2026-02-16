import { useMemo } from "react";
import { isSome } from "gill";
import { RAFFLE_PROGRAM_ADDRESS } from "anchor/src";
import { useGetRoundPlayersQuery } from "graphql/gen/hooks";
import { useGetCurrentRaffleRoundIdForSol } from "pages/Play/hooks/useGetCurrentRaffleRoundId";
import { useSolRaffleRound } from "pages/Play/hooks/useSolRaffleRoundDirect";

export const useSolanaRaffle = (roundId?: undefined | number | null) => {
  const { data: currentSolRoundId, isLoading } = useGetCurrentRaffleRoundIdForSol();

  const queryRoundId = roundId === undefined || roundId === null ? currentSolRoundId : roundId;

  const { data, isLoading: isSolRaffleRoundLoading } = useSolRaffleRound(queryRoundId || 0);

  const { data: roundPlayers } = useGetRoundPlayersQuery({
    variables: {
      roundId: queryRoundId as number,
      tokenAddress: "11111111111111111111111111111111",
      contractAddress: RAFFLE_PROGRAM_ADDRESS,
    },
    fetchPolicy: "no-cache",
    skip: typeof queryRoundId !== "number",
    pollInterval: 5000,
  });

  const ticketsByPlayer = useMemo(() => {
    const ticketsByPlayer: Record<string, { ticketsCount: number; hasBonusTicket: boolean }> = {};
    roundPlayers?.roundPlayers?.forEach((player) => {
      ticketsByPlayer[player.address] = {
        ticketsCount: player.totalTickets,
        hasBonusTicket: player.hasBonusTicket,
      };
    });
    return ticketsByPlayer;
  }, [roundPlayers]);

  const players = useMemo(
    () =>
      Object.entries(ticketsByPlayer).map(([player, data]) => ({
        player,
        ...data,
        ticketsCount: Number(data.ticketsCount),
      })),
    [ticketsByPlayer],
  );

  const totalTickets = useMemo(
    () => Object.entries(ticketsByPlayer).reduce((acc, curr) => acc + curr[1].ticketsCount, 0),
    [ticketsByPlayer],
  );

  return {
    isLoading: isSolRaffleRoundLoading || isLoading,
    players,
    winnerAddress: data?.winnerAddress && isSome(data?.winnerAddress) ? data.winnerAddress.value : null,
    winnerTicket: data?.winnerTicketIndex && isSome(data?.winnerTicketIndex) ? data?.winnerTicketIndex.value : null,
    status: data?.status,
    actualRoundId: currentSolRoundId || 0,
    roundId: data?.roundId,
    active: currentSolRoundId === queryRoundId,
    endTime: data?.endTime,
    poolBalance: data?.prizeAmount,
    totalTickets,
    totalPlayers: players?.length || 0,
  };
};
