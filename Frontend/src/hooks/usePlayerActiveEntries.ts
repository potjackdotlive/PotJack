import { useMemo } from "react";
import { useWalletConnection } from "hooks/useWalletConnection";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { useRaffleRoundsAllNetworks } from "pages/Play/hooks/useRaffleRoundsAllNetworks";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { ChainIdType } from "utils/types";

type ActiveEntry = {
  coin: SepoliaCoinType;
  endTime: number;
  prizePool: number;
  totalTickets: number;
  playerTickets: number;
  hasBonusTicket: boolean;
};

export const usePlayerActiveEntries = () => {
  const { networkId } = usePlayContext();
  const { address: playerAddress } = useWalletConnection();
  const { raffleRounds } = useRaffleRoundsAllNetworks();

  return useMemo(() => {
    if (!networkId || !raffleRounds?.[networkId as ChainIdType]) {
      return [];
    }

    const result: ActiveEntry[] = Object.entries(raffleRounds[networkId as ChainIdType]).map(
      ([coin, raffleRoundResult]) => {
        const playerEntry = raffleRoundResult?.players?.find((p) => p.player === playerAddress);

        return {
          coin: coin as SepoliaCoinType,
          endTime: raffleRoundResult?.round?.endTime,
          prizePool: raffleRoundResult?.round?.poolBalance,
          totalTickets: raffleRoundResult?.round?.totalTickets || raffleRoundResult?.round?.tickets?.length || 0,
          playerTickets: Number(playerEntry?.ticketsCount || 0),
          hasBonusTicket: playerEntry?.hasBonusTicket || false,
        };
      },
    );

    return result.filter(({ playerTickets }) => Boolean(playerTickets));
  }, [playerAddress, raffleRounds, networkId]);
};
