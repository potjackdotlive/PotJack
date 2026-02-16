import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { Address } from "viem";
import { RoundPlayerDataWithAddress } from "anchor/src";
import { QUERY_KEYS } from "constants/queryKeys";
import { Raffle } from "contracts/Raffle/Raffle";
import { useChainCoinSet } from "hooks/useChainCoinSet";
import { useLastRounds } from "pages/Play/hooks/useLastRounds";
import { useSolanaRaffle } from "pages/Play/hooks/useSolanaRaffle";
import { SOLANA_CHAIN_ID } from "utils/constants/chainsConstants";
import { getContractByChainId } from "utils/contractGetters/getContractByChainId";
import { SolanaTokens } from "utils/enums/tokens/solanaTokens";
import { getTokenAddress } from "utils/getTokenAddress";
import { ChainIdType, CoinType } from "utils/types";

export type RaffleRoundResult = {
  round: {
    active: boolean;
    endTime: number;
    poolBalance: number;
    tickets?: Raffle.TicketStructOutput[];
    totalTickets?: number;
    winnerAddress: string;
    winnerTicket: bigint | number;
  };
  players:
    | {
        ticketsCount: number;
        hasBonusTicket: boolean;
        player: string;
      }[]
    | RoundPlayerDataWithAddress[];
};

type RaffleDataByNetwork = {
  lotteriesAvailable: number;
  lotteriesActive: number;
  totalTickets: number;
  totalPlayers: number;
};

type TotalTickets = {
  all: number;
  withoutBonusTickets: number;
};

export const useRaffleRoundsAllNetworks = () => {
  const chainCoinSet = useChainCoinSet();
  const lastRounds = useLastRounds();

  const solanaRaffle = useSolanaRaffle();

  const raffleRoundsEth = useQueries({
    combine: (results): Record<ChainIdType, Record<CoinType, RaffleRoundResult>> => {
      const result = {} as Record<ChainIdType, Record<CoinType, RaffleRoundResult>>;

      const data = results.map((result) => result.data) as unknown as [
        Raffle.RoundStructOutput,
        Raffle.RoundPlayerDataWithAddressStructOutput[],
      ][];

      let index = 0;
      Object.entries(chainCoinSet).flatMap((entity) => {
        const [chainId, tokens] = entity as unknown as [ChainIdType, string[]];
        tokens.forEach((token) => {
          if (data[index]) {
            const round = data[index]?.[0] || ({} as Raffle.RoundStructOutput);
            const players = data[index]?.[1] || ([] as Raffle.RoundPlayerDataWithAddressStructOutput[]);

            if (!result[chainId]) {
              result[chainId] = {} as Record<CoinType, RaffleRoundResult>;
            }

            result[chainId] = {
              ...result[chainId],
              [token]: {
                round: {
                  active: Number(round?.status) === 1,
                  endTime: Number(round?.endTime || 0) * 1000 || null,
                  poolBalance: Number(round?.poolBalance || 0),
                  tickets: round?.tickets,
                  winnerAddress: round?.winnerAddress,
                  winnerTicket: round?.winnerTicket,
                },
                players,
              },
            };
          }
          index += 1;
        });
      });

      return result;
    },
    queries: Object.entries(chainCoinSet).flatMap((entity) => {
      const [chainId, tokens] = entity as unknown as [ChainIdType, string[]];
      const contract = getContractByChainId(chainId);

      return tokens.map((token) => {
        const chainRoundsData = lastRounds?.data?.[chainId];
        const coinRoundData = chainRoundsData?.[token];
        const actualRoundId = coinRoundData?.actualRoundId;
        const tokenAddress = getTokenAddress({ chainId, coin: token as CoinType });
        const isActive = coinRoundData?.active;

        const enabled =
          !lastRounds?.isLoading &&
          !!coinRoundData &&
          !!contract &&
          !!tokenAddress &&
          actualRoundId !== undefined &&
          actualRoundId !== null &&
          isActive;

        return {
          queryKey: [QUERY_KEYS.ABI.GET_RAFFLE_ROUND_DATA, tokenAddress, actualRoundId, chainId, isActive],
          queryFn: () => contract?.read?.getRaffleRoundData([tokenAddress as Address, actualRoundId]),
          enabled,
        };
      });
    }),
  });

  const dataByNetwork: Record<ChainIdType, RaffleDataByNetwork> = useMemo(() => {
    const result = {} as Record<ChainIdType, RaffleDataByNetwork>;

    Object.entries(chainCoinSet).forEach((entry) => {
      const [chId, coinList] = entry as unknown as [ChainIdType, string[]];

      result[chId] = {} as RaffleDataByNetwork;
      coinList.forEach((coin) => {
        if (coin === SolanaTokens.Solana) {
          const isActive = solanaRaffle.active || false;
          result[chId] = {
            lotteriesAvailable: 1,
            lotteriesActive: (result[chId]?.lotteriesActive || 0) + Number(isActive),
            totalTickets: (result[chId]?.totalTickets || 0) + (isActive ? solanaRaffle?.totalTickets || 0 : 0),
            totalPlayers: (result[chId]?.totalPlayers || 0) + (isActive ? solanaRaffle?.players?.length || 0 : 0),
          };
        } else {
          const coinData = raffleRoundsEth[chId]?.[coin as CoinType];
          const isActive = coinData?.round?.active || false;

          result[chId] = {
            lotteriesAvailable: (result[chId]?.lotteriesAvailable || 0) + 1,
            lotteriesActive: (result[chId]?.lotteriesActive || 0) + Number(isActive),
            totalTickets: (result[chId]?.totalTickets || 0) + (isActive ? coinData?.round?.tickets?.length || 0 : 0),
            totalPlayers: (result[chId]?.totalPlayers || 0) + (isActive ? coinData?.players?.length : 0),
          };
        }
      });
    });

    return result;
  }, [raffleRoundsEth, chainCoinSet, solanaRaffle]);

  const totalTickets: TotalTickets = useMemo(() => {
    const totalTicketAmount: TotalTickets = { all: 0, withoutBonusTickets: 0 };

    Object.values(dataByNetwork).forEach((networkData) => {
      if (networkData.totalTickets) {
        totalTicketAmount.all += networkData?.totalTickets || 0;
        totalTicketAmount.withoutBonusTickets += (networkData?.totalTickets || 0) - (networkData?.lotteriesActive || 0);
      }
    });

    return totalTicketAmount;
  }, [dataByNetwork]);

  const raffleRounds: Record<ChainIdType, Record<CoinType, RaffleRoundResult>> = useMemo(() => {
    const solResult: RaffleRoundResult = {
      round: {
        winnerAddress: solanaRaffle?.winnerAddress?.toString() || "",
        winnerTicket: solanaRaffle?.winnerTicket || 0,
        poolBalance: Number(solanaRaffle?.poolBalance) || 0,
        endTime: Number(solanaRaffle?.endTime || 0) * 1000,
        active: solanaRaffle.active,
        totalTickets: solanaRaffle?.totalTickets,
      },
      players: solanaRaffle.players || [],
    };

    return {
      ...raffleRoundsEth,
      [SOLANA_CHAIN_ID as ChainIdType]: {
        [SolanaTokens.Solana as CoinType]: solResult,
      },
    };
  }, [raffleRoundsEth, solanaRaffle]);

  return {
    totalTicketAmount: totalTickets.all,
    totalTicketsWithoutBonus: totalTickets.withoutBonusTickets,
    dataByNetwork,
    raffleRounds: raffleRounds || {},
  };
};
