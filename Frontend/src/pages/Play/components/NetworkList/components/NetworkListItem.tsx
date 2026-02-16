import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Tooltip } from "antd";
import { css } from "@emotion/react";
import { TooltipLine } from "components/TooltipWrapper/TooltipLine";
import { TooltipWrapper } from "components/TooltipWrapper/TooltipWrapper";
import { NetworkLogoShortname } from "pages/Play/components/NetworkList/components/NetworkLogoShortname";
import { RaffleItemInfo } from "pages/Play/components/RaffleListItem/components/RaffleItemInfo";
import { TimerContext } from "pages/Play/components/RaffleListItem/contexts/TimerContext/TimerContext";
import { raffleListItemStyles } from "pages/Play/components/RaffleListItem/raffleListItemStyles";
import { useHighlightContext } from "pages/Play/contexts/chartHighlightContext/chartHighlightContextUtils";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { TXT_PLAYERS, TXT_TICKETS, TXT_TIME_UNTIL_DRAW, TXT_TOTAL_POOL_BTC } from "translations";
import { amountFormatter } from "utils/formatters/amountFormatter";
import { coinFormatter } from "utils/formatters/coinFormatter";
import { getChainFullName } from "utils/getChainFullName";
import { ChainIdType } from "utils/types";

export type NetworkListItemProps = {
  pool: number;
  chainId: ChainIdType;
  players: number;
  tickets: number;
};

const TooltipContent: FC<Omit<NetworkListItemProps, "chainId">> = ({ players, pool, tickets }) => {
  const { t } = useTranslation();

  return (
    <TooltipWrapper>
      <TooltipLine prefix={t(TXT_TOTAL_POOL_BTC)} value={coinFormatter(pool)} mono />
      <TooltipLine prefix={t(TXT_TIME_UNTIL_DRAW)} value={<TimerContext />} mono />
      <TooltipLine prefix={t(TXT_PLAYERS)} value={amountFormatter(players)} mono />
      <TooltipLine prefix={t(TXT_TICKETS)} value={`${tickets || 0}`} mono />
    </TooltipWrapper>
  );
};

export const NetworkListItem: FC<NetworkListItemProps> = ({ chainId, pool, players, tickets }) => {
  const { networkId, setNetworkId } = usePlayContext();
  const { highlightedItem } = useHighlightContext();

  const chainFullName = getChainFullName(chainId);

  const handleClick = () => {
    if (!chainId || Number(chainId) === networkId) {
      return;
    }

    setNetworkId(chainId);
  };

  const dimCondition = !networkId && highlightedItem && highlightedItem !== chainFullName;

  return (
    <Tooltip
      title={<TooltipContent pool={pool} players={players} tickets={tickets} />}
      destroyOnHidden
      arrow={false}
      placement="right"
    >
      <Flex
        css={[
          raffleListItemStyles.root,
          dimCondition
            ? css`
                opacity: 0.6;
              `
            : css``,
        ]}
        onClick={handleClick}
      >
        <NetworkLogoShortname chainName={chainFullName} chainId={chainId} />
        <RaffleItemInfo chainId={chainId} pool={pool} />
      </Flex>
    </Tooltip>
  );
};
