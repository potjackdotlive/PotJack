import { useMemo } from "react";
import type { EChartsOption, RegisteredSeriesOption } from "echarts/types/dist/echarts";
import { useChainCoinSet } from "hooks/useChainCoinSet";
import { useBaseChartOptions } from "pages/Play/components/MainArea/hooks/useBaseChartOptions";
import {
  CoinTooltipData,
  NetworkTooltipData,
  TotalTooltipData,
  useTooltipFormatter,
} from "pages/Play/components/MainArea/hooks/useTooltipFormatter";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { useRaffleRound } from "pages/Play/hooks/useRaffleRound";
import { useRaffleRoundsAllNetworks } from "pages/Play/hooks/useRaffleRoundsAllNetworks";
import { BTC_PER_TICKET } from "utils/constants/raffleConstants";
import { coinFormatter } from "utils/formatters/coinFormatter";
import { getChainFullName } from "utils/getChainFullName";
import { getCoinDecimals } from "utils/getCoinDecimals";
import { getColorByChain } from "utils/getColorByChain";
import { getColorByCoin } from "utils/getColorByCoin";
import { ChainIdType, CoinType } from "utils/types";

declare type Values<T> = T[keyof T];

export const useChartOptions = (): EChartsOption => {
  const { coin, roundId, networkId } = usePlayContext();
  const formatter = useTooltipFormatter({ coin, chainId: networkId as ChainIdType });
  const chainCoinSet = useChainCoinSet();

  const { raffleRounds, dataByNetwork, totalTicketsWithoutBonus } = useRaffleRoundsAllNetworks();

  const { raffleRoundData } = useRaffleRound({ coin, roundId, chainId: networkId as ChainIdType });

  const mappedPlayersData: CoinTooltipData[] = coin
    ? raffleRoundData?.players?.map((pd) => ({
        value: pd.ticketsCount as unknown as number,
        playerAddress: pd.player,
        hasBonusTicket: pd.hasBonusTicket,
        active: raffleRoundData.round.active,
        winner: raffleRoundData.round.winnerAddress === pd.player,
      }))
    : [];

  const mappedTotalData: TotalTooltipData[] = useMemo(
    () =>
      Object.entries(dataByNetwork).map(([chId, data]) => {
        const value = ((data?.totalTickets || 0) - (data?.lotteriesActive || 0)) * BTC_PER_TICKET;
        return {
          itemStyle: { color: getColorByChain(chId) },
          groupName: getChainFullName(chId),
          value: value < 0 ? 0 : value,
          lotteriesAvailable: data?.lotteriesAvailable || 0,
        };
      }),
    [dataByNetwork],
  );

  const mappedNetworkData: NetworkTooltipData[] = useMemo(() => {
    if (!networkId || !raffleRounds[networkId as ChainIdType]) {
      return [];
    }

    const networkData = raffleRounds[networkId as ChainIdType];
    const coinList = chainCoinSet[networkId as ChainIdType];

    return coinList.map((c) => {
      const round = networkData[c as CoinType]?.round || {};
      const players = networkData[c as CoinType]?.players || [];
      const isActive = round?.active;
      const totalPool = (round?.poolBalance || 0) / getCoinDecimals(c as CoinType);

      const boughtTickets = isActive ? (round?.tickets?.length || round?.totalTickets || 0) - 1 : 0;
      const totalTickets = round?.tickets?.length || round?.totalTickets || 0;

      return {
        itemStyle: { color: getColorByCoin(c as CoinType) },
        groupName: c,
        totalPool: coinFormatter(totalPool),
        totalTickets: isActive ? totalTickets : 0,
        boughtTickets: boughtTickets < 0 ? 0 : boughtTickets,
        playerCount: players?.length || 0,
        value: isActive ? totalTickets : 0,
      } as NetworkTooltipData;
    });
  }, [networkId, raffleRounds, chainCoinSet]);

  const poolBalance = raffleRoundData?.round?.poolBalance || 0;

  const poolAmount = poolBalance / getCoinDecimals(coin);

  const centerTotal = coin
    ? coinFormatter(poolAmount)
    : networkId
      ? coinFormatter(mappedNetworkData?.reduce((acc, curr) => acc + curr?.boughtTickets || 0, 0) * BTC_PER_TICKET)
      : coinFormatter(totalTicketsWithoutBonus * BTC_PER_TICKET, { maximumSignificantDigits: 6 });

  const baseChartConfig = useBaseChartOptions();

  return useMemo(() => {
    const data = coin ? mappedPlayersData : networkId ? mappedNetworkData : mappedTotalData;

    const baseSeries = baseChartConfig?.series as Values<RegisteredSeriesOption>[];
    const series = [
      {
        ...(baseSeries?.[0] || {}),
        data,
      },
    ] as Values<RegisteredSeriesOption>[];

    return {
      ...baseChartConfig,
      tooltip: {
        ...baseChartConfig.tooltip,
        formatter,
      },
      title: {
        ...baseChartConfig.title,
        subtext: coin || `BTC`,
        text: `${centerTotal || 0}`,
      },
      series,
    };
  }, [centerTotal, coin, formatter, mappedPlayersData, mappedNetworkData, mappedTotalData, networkId, baseChartConfig]);
};
