import { useQueries } from "@tanstack/react-query";
import { isPast } from "date-fns";
import { QUERY_KEYS } from "constants/queryKeys";
import { useChainIds } from "hooks/useChainIds";
import { useSolanaRaffle } from "pages/Play/hooks/useSolanaRaffle";
import { checkIsArbitrum } from "utils/checkIsArbitrum";
import {
  AVALANCHE_FUJI_TESTNET_ID,
  BASE_SEPOLIA_TESTNET_ID,
  BNB_SMART_CHAIN_TESTNET_ID,
  OPTIMISM_SEPOLIA_TESTNET_ID,
  POLYGON_AMOY_TESTNET_ID,
  SEPOLIA_ARBITRUM_CHAIN_ID,
  SEPOLIA_CHAIN_ID,
  SOLANA_CHAIN_ID,
} from "utils/constants/chainsConstants";
import { getContractByChainId } from "utils/contractGetters/getContractByChainId";
import { RaffleStatus } from "utils/enums/raffleStatus";
import { getCoinTypeByAddress } from "utils/getCoinTypeByAddress";
import { ChainIdType } from "utils/types";

type MappedRoundData = {
  actualRoundId: number;
  active: boolean;
  endTime: bigint;
  poolBalance: bigint;
};

export type CoinRoundDataSet = Record<string, MappedRoundData>;

type UseLastRoundsReturn = {
  isLoading: boolean;
  data: Record<ChainIdType, CoinRoundDataSet>;
};

// amount of tokens on network
const getLimitByChainId = (chainId: ChainIdType | string): number => {
  switch (Number(chainId)) {
    case SEPOLIA_CHAIN_ID:
      return 3;
    case SEPOLIA_ARBITRUM_CHAIN_ID:
    case BNB_SMART_CHAIN_TESTNET_ID:
      return 2;
    case OPTIMISM_SEPOLIA_TESTNET_ID:
    case BASE_SEPOLIA_TESTNET_ID:
    case AVALANCHE_FUJI_TESTNET_ID:
    case POLYGON_AMOY_TESTNET_ID:
      return 1;
    default:
      return 0;
  }
};

export const useLastRounds = (): UseLastRoundsReturn => {
  const chainIds = useChainIds();

  const solanaRaffle = useSolanaRaffle();

  const ethQueries = useQueries({
    combine: (queries) => {
      const loading = queries.some((q) => q.isLoading);

      const dataList = queries.map((result) => result.data);

      const result = {} as Record<ChainIdType, CoinRoundDataSet>;

      chainIds.forEach((chId, index) => {
        const data = dataList[index];

        data?.forEach((roundData) => {
          const coin = getCoinTypeByAddress({ chainId: chId, coinAddress: roundData.token });
          const status = roundData?.status as RaffleStatus;
          const roundId = Number(roundData?.roundId || 0);
          const showNextRound = roundData.endTime && isPast(Number(roundData?.endTime) * 1000);

          if (!coin) {
            return;
          }

          if (!result[chId as keyof typeof result]) {
            result[chId as keyof typeof result] = {} as CoinRoundDataSet;
          }

          result[chId as keyof typeof result][coin] = {
            endTime: roundData?.endTime,
            poolBalance: roundData?.poolBalance,
            actualRoundId: showNextRound ? roundId + 1 : roundId,
            active: status === RaffleStatus.Open || status === RaffleStatus.NonExistent,
          };
        });
      });

      return {
        data: result,
        isLoading: loading,
      };
    },
    queries: chainIds.map((chId) => {
      const contract = getContractByChainId(chId as ChainIdType);
      const offset = 0;
      const limit = getLimitByChainId(chId);
      const isArbitrum = checkIsArbitrum(chId);

      return {
        queryKey: [QUERY_KEYS.ABI.GET_LAST_ROUNDS, chId, offset, limit],
        queryFn: () => contract?.read?.getLastRounds([BigInt(offset), BigInt(limit)]),
        enabled: !!contract,
        staleTime: isArbitrum ? 30_000 : 10_000,
        refetchInterval: 15_000 + Math.random() * 5_000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 1,
      };
    }),
  });

  if (solanaRaffle) {
    return {
      data: {
        ...ethQueries.data,
        [SOLANA_CHAIN_ID as ChainIdType]: {
          SOL: solanaRaffle,
        },
      },
      isLoading: solanaRaffle.isLoading || ethQueries.isLoading,
    };
  }

  return {
    data: ethQueries.data,
    isLoading: ethQueries.isLoading,
  };
};
