import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Tooltip } from "antd";
import { css } from "@emotion/react";
import { getChainNameById } from "components/BlockchainSelector/utils";
import { TooltipLine } from "components/TooltipWrapper/TooltipLine";
import { TooltipWrapper } from "components/TooltipWrapper/TooltipWrapper";
import { LogoShortname } from "pages/Play/components/RaffleListItem/components/LogoShortname";
import { RaffleItemInfo } from "pages/Play/components/RaffleListItem/components/RaffleItemInfo";
import { TimerContext } from "pages/Play/components/RaffleListItem/contexts/TimerContext/TimerContext";
import { raffleListItemStyles } from "pages/Play/components/RaffleListItem/raffleListItemStyles";
import { useHighlightContext } from "pages/Play/contexts/chartHighlightContext/chartHighlightContextUtils";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { useLastRounds } from "pages/Play/hooks/useLastRounds";
import { useRaffleRoundsAllNetworks } from "pages/Play/hooks/useRaffleRoundsAllNetworks";
import {
  TXT_BLOCKCHAIN,
  TXT_PLAYERS,
  TXT_ROUND,
  TXT_ROUND_TICKET,
  TXT_TIME_UNTIL_DRAW,
  TXT_TOTAL_POOL,
} from "translations";
import { amountFormatter } from "utils/formatters/amountFormatter";
import { coinFormatter } from "utils/formatters/coinFormatter";
import { getCoinScaledValue } from "utils/getCoinScaledValue";
import { ChainIdType, CoinType } from "utils/types";

type TooltipContentProps = {
  pool: number;
  token: CoinType;
  network: string;
  playerCount: number;
  round: number;
};

const TooltipContent: FC<TooltipContentProps> = ({ token, network, playerCount, round, pool }) => {
  const { t } = useTranslation();

  return (
    <TooltipWrapper>
      <TooltipLine prefix={t(TXT_ROUND_TICKET)} value={token} />
      <TooltipLine prefix={t(TXT_BLOCKCHAIN)} value={network} />
      <TooltipLine prefix={t(TXT_TOTAL_POOL)} value={coinFormatter(pool)} mono />
      <TooltipLine prefix={t(TXT_TIME_UNTIL_DRAW)} value={<TimerContext />} mono />
      <TooltipLine prefix={t(TXT_PLAYERS)} value={amountFormatter(playerCount)} mono />
      <TooltipLine prefix={t(TXT_ROUND)} value={`${round}`} mono />
    </TooltipWrapper>
  );
};

export type RaffleListItemProps = {
  token: CoinType;
};

export const RaffleListItem: FC<RaffleListItemProps> = ({ token }) => {
  const { setCoin, coin, setRoundData, networkId } = usePlayContext();
  const { data } = useLastRounds();
  const { highlightedItem } = useHighlightContext();

  const roundId = data[networkId as ChainIdType]?.[token]?.actualRoundId || 0;
  const isActive = data[networkId as ChainIdType]?.[token]?.active || false;

  const { raffleRounds } = useRaffleRoundsAllNetworks();

  const itemData = raffleRounds?.[networkId as ChainIdType]?.[token] || {};

  const handleSelectCoin = () => {
    setCoin(token);
    setRoundData({ roundId, active: isActive, maxRoundForCoin: roundId });
  };

  const isSelected = coin === token;
  const scaledPoolBalance = isActive ? getCoinScaledValue(itemData?.round?.poolBalance || 0, token) : 0;
  const playerCount = isActive ? itemData?.players?.length || 0 : 0;

  const dimCondition = !coin && highlightedItem && highlightedItem !== token;

  return (
    <Tooltip
      title={
        <TooltipContent
          playerCount={playerCount}
          pool={scaledPoolBalance}
          token={token}
          network={getChainNameById(networkId)}
          round={Number(roundId || 0) + 1}
        />
      }
      destroyOnHidden
      arrow={false}
      placement="right"
    >
      <Flex
        css={[
          raffleListItemStyles.root,
          isSelected && raffleListItemStyles.active,
          dimCondition
            ? css`
                opacity: 0.6;
              `
            : css``,
        ]}
        onClick={handleSelectCoin}
      >
        <LogoShortname token={token} />
        <RaffleItemInfo token={token} pool={scaledPoolBalance} />
      </Flex>
    </Tooltip>
  );
};
