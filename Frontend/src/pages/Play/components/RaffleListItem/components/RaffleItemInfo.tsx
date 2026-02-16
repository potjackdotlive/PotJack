import { FC } from "react";
import { Flex, Typography } from "antd";
import { Indicator } from "pages/Play/components/RaffleListItem/components/Indicator";
import { TimerContext } from "pages/Play/components/RaffleListItem/contexts/TimerContext/TimerContext";
import { raffleListItemStyles } from "pages/Play/components/RaffleListItem/raffleListItemStyles";
import { coinFormatter } from "utils/formatters/coinFormatter";
import { ChainIdType, CoinType } from "utils/types";

type Props = {
  pool: number;
  token?: CoinType;
  chainId?: ChainIdType | string;
  showOnly?: boolean;
};

export const RaffleItemInfo: FC<Props> = ({ pool, token, chainId }) => (
  <Flex gap={12} align="center" style={{ height: "100%" }}>
    <Flex vertical gap={6} align="flex-end">
      <Typography css={raffleListItemStyles.poolAmount}>{coinFormatter(pool)}</Typography>
      <Typography css={raffleListItemStyles.raffleEndTime}>
        <TimerContext showOnlyCurrentRound />
      </Typography>
    </Flex>
    <Indicator token={token} chainId={chainId as ChainIdType} />
  </Flex>
);
