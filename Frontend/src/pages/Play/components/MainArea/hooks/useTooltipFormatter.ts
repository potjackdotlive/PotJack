import { useMemo } from "react";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line import/no-unresolved
import { CallbackDataParams, TopLevelFormatterParams } from "echarts/types/dist/shared";
import { useWalletConnection } from "hooks/useWalletConnection";
import {
  TXT_BLOCKCHAIN,
  TXT_CHANCE_TO_WIN,
  TXT_COIN,
  TXT_IS_YOU,
  TXT_NO,
  TXT_ODDS_PERCENTAGE,
  TXT_PLAYERS,
  TXT_ROUNDS_AVAILABLE,
  TXT_TICKET_COUNT,
  TXT_TOTAL_POOL,
  TXT_TOTAL_TICKETS,
  TXT_WINNER,
  TXT_YES,
} from "translations";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { amountFormatter } from "utils/formatters/amountFormatter";
import { coinFormatter } from "utils/formatters/coinFormatter";
import { getCoinFullName } from "utils/getCoinFullName";
import { ChainIdType, CoinType } from "utils/types";

export type TotalTooltipData = {
  groupName: string;
  lotteriesAvailable: number;
  value: number | string;
};

export type CoinTooltipData = {
  value: number | string;
  playerAddress: string;
  active: boolean;
  winner?: boolean;
};

export type NetworkTooltipData = {
  value: number | string;
  groupName: SepoliaCoinType;
  totalTickets: number;
  boughtTickets: number;
  totalPool: string;
  playerCount: number;
};

type FormatterResult = (params: TopLevelFormatterParams) => string;

type UseTooltipFormatterProps = {
  coin: CoinType | null;
  chainId: ChainIdType | null;
};

export const useTooltipFormatter = ({ chainId, coin }: UseTooltipFormatterProps): FormatterResult => {
  const { t } = useTranslation();
  const { address } = useWalletConnection();

  return useMemo(() => {
    if (coin) {
      return (params: TopLevelFormatterParams) => {
        const data = (params as CallbackDataParams).data as CoinTooltipData;

        const isCurrentPlayer = address === data?.playerAddress;
        const isActiveRound = data?.active;
        const isWinner = data?.winner;

        return `<div>
          <div><span class="tooltip-key">${t(TXT_TICKET_COUNT)}:</span> <span class="tooltip-value">${data?.value}</span></div>
          <div><span class="tooltip-key">${t(TXT_CHANCE_TO_WIN)}:</span> <span class="tooltip-value-mono">${t(TXT_ODDS_PERCENTAGE, { percentage: (params as CallbackDataParams).percent })}</span></div>
          ${isCurrentPlayer ? `<div><span class="tooltip-key">${t(TXT_IS_YOU)}:</span> <span class="tooltip-value">${t(TXT_YES)}</span></div>` : ""}
          ${isActiveRound ? "" : `<div><span class="tooltip-key">${t(TXT_WINNER)}:</span> <span class="tooltip-value">${isWinner ? t(TXT_YES) : t(TXT_NO)}</span></div>`}
        </div>`;
      };
    }

    if (chainId) {
      return (params: TopLevelFormatterParams) => {
        const data = (params as CallbackDataParams).data as NetworkTooltipData;
        return `<div>
        <div><span class="tooltip-key">${t(TXT_COIN)}:</span> <span class="tooltip-value">${getCoinFullName(data?.groupName)}</span></div>
        <div><span class="tooltip-key">${t(TXT_TOTAL_POOL)}:</span> <span class="tooltip-value-mono">${data?.totalPool}</span></div>
        <div><span class="tooltip-key">${t(TXT_TOTAL_TICKETS)}:</span> <span class="tooltip-value">${data.totalTickets}</span></div>
        <div><span class="tooltip-key">${t(TXT_PLAYERS)}:</span> <span class="tooltip-value-mono">${amountFormatter(data?.playerCount)}</span></div>
      </div>`;
      };
    }

    return (params: TopLevelFormatterParams) => {
      const data = (params as CallbackDataParams).data as TotalTooltipData;
      return `<div>
        <div><span class="tooltip-key">${t(TXT_BLOCKCHAIN)}:</span> <span class="tooltip-value">${data.groupName}</span></div>
        <div><span class="tooltip-key">${t(TXT_TOTAL_POOL)}:</span> <span class="tooltip-value-mono">${coinFormatter(data.value)}</span></div>
        <div><span class="tooltip-key">${t(TXT_ROUNDS_AVAILABLE)}:</span> <span class="tooltip-value">${data.lotteriesAvailable}</span></div>
      </div>`;
    };
  }, [t, coin, chainId, address]);
};
