import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { Indicator } from "pages/Play/components/RaffleListItem/components/Indicator";
import { raffleListItemStyles } from "pages/Play/components/RaffleListItem/raffleListItemStyles";
import { TXT_AMOUNT_BTC, TXT_X_ENTRIES } from "translations";
import { coinFormatter } from "utils/formatters/coinFormatter";
import { ChainIdType, CoinType } from "utils/types";

type Props = {
  pool: number;
  entries: number;
  token?: CoinType;
  chainId?: ChainIdType | string;
};

export const NetworkItemInfo: FC<Props> = ({ entries, pool, token, chainId }) => {
  const { t } = useTranslation();

  return (
    <Flex gap={12} align="center" style={{ height: "100%" }}>
      <Flex vertical gap={6} align="flex-end">
        <Typography css={raffleListItemStyles.poolAmount}>
          {t(TXT_AMOUNT_BTC, { amount: coinFormatter(pool) })}
        </Typography>
        <Typography css={raffleListItemStyles.raffleEndTime}>{t(TXT_X_ENTRIES, { entries })}</Typography>
      </Flex>
      <Indicator token={token} chainId={chainId as ChainIdType} />
    </Flex>
  );
};
