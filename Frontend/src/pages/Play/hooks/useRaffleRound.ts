import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { QUERY_KEYS } from "constants/queryKeys";
import { Raffle } from "contracts/Raffle/Raffle";
import { useLastRounds } from "pages/Play/hooks/useLastRounds";
import { useSolanaRaffle } from "pages/Play/hooks/useSolanaRaffle";
import { SOLANA_CHAIN_ID } from "utils/constants/chainsConstants";
import { getContractByChainId } from "utils/contractGetters/getContractByChainId";
import { RaffleStatus, SolanaRaffleStatus } from "utils/enums/raffleStatus";
import { getTokenAddress } from "utils/getTokenAddress";
import { ChainIdType, CoinType, Nullable } from "utils/types";

type RaffleRoundResult = {
  round: {
    active: boolean;
    status: RaffleStatus | SolanaRaffleStatus;
    endTime: number | null;
    poolBalance: number;
    ticketCount: number;
    winnerAddress: string;
    winnerTicket: number | bigint | null;
  };
  players:
    | readonly Raffle.RoundPlayerDataWithAddressStructOutput[]
    | {
        ticketsCount: number;
        hasBonusTicket: boolean;
        player: string;
      }[];
};

type Props = {
  coin: Nullable<CoinType>;
  roundId: Nullable<number>;
  chainId: Nullable<ChainIdType>;
  enabled?: boolean;
};

export const useRaffleRound = ({ coin, roundId, chainId, enabled = true }: Props) => {
  const contract = getContractByChainId(chainId);
  const tokenAddress = getTokenAddress({ chainId, coin });

  const { data } = useLastRounds();

  const actualRoundId = chainId && coin && data?.[chainId][coin]?.actualRoundId;
  const fetchCheck = actualRoundId !== null && actualRoundId !== undefined && roundId !== null && roundId !== undefined;

  const query = useQuery({
    queryKey: [QUERY_KEYS.ABI.GET_RAFFLE_ROUND_DATA, tokenAddress, roundId, chainId],
    queryFn: () => contract?.read?.getRaffleRoundData([tokenAddress as Address, roundId || 0]),
    enabled: !!coin && enabled && !!contract && !!tokenAddress && fetchCheck && Number(chainId) !== SOLANA_CHAIN_ID,
  });

  const solQuery = useSolanaRaffle(roundId);

  if (Number(chainId) === SOLANA_CHAIN_ID) {
    const status = solQuery?.status as unknown as SolanaRaffleStatus;
    const raffleRoundData: RaffleRoundResult = {
      round: {
        status,
        active: status === SolanaRaffleStatus.Open,
        endTime: Number(solQuery?.endTime || 0) * 1000 || null,
        winnerAddress: solQuery?.winnerAddress?.toString() || "",
        winnerTicket: solQuery?.winnerTicket || null,
        poolBalance: Number(solQuery?.poolBalance || 0),
        ticketCount: solQuery?.totalTickets || 0,
      },
      players: solQuery?.players || [],
    };

    return {
      query: solQuery,
      raffleRoundData,
    };
  }

  const round = query?.data?.[0] || ({} as Raffle.RoundStructOutput);
  const players = (query?.data?.[1] || []) as unknown as Raffle.RoundPlayerDataWithAddressStructOutput[];

  const raffleRoundData: RaffleRoundResult = {
    round: {
      status: round?.status as RaffleStatus,
      active: round?.status === RaffleStatus.Open,
      endTime: Number(round?.endTime || 0) * 1000 || null,
      winnerAddress: round?.winnerAddress,
      winnerTicket: round?.winnerTicket,
      poolBalance: Number(round?.poolBalance || 0),
      ticketCount: round?.tickets?.length || 0,
    },
    players: players as Raffle.RoundPlayerDataWithAddressStructOutput[],
  };

  return { query, raffleRoundData };
};
