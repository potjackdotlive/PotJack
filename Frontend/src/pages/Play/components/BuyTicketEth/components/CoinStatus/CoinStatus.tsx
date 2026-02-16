import React, { FC } from "react";
import { Flex, Typography } from "antd";
import { CoinIconProvider } from "components/CoinIconProvider/CoinIconProvider";
import { NetworkIconProvider } from "components/NetworkIconProvider/NetworkIconProvider";
import { useGetTicketPriceForToken } from "hooks/abi/useGetTicketPriceForToken";
import { useGetTicketPriceInUsd } from "hooks/abi/useGetTicketPriceInUsd";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { ticketStyles as styles } from "pages/Play/components/BuyTicketEth/ticketStyles";
import { commonStyles } from "styles/commonStyles";
import { BTC_PER_TICKET } from "utils/constants/raffleConstants";
import { NetworkType } from "utils/enums/networks";
import { coinFormatter } from "utils/formatters/coinFormatter";
import { priceFormatter } from "utils/formatters/priceFormatter";
import { CoinType } from "utils/types";

type CoinsStatusProps = {
  amount?: number;
  coin?: CoinType;
  showUsd?: boolean;
  showBtc?: boolean;
  network?: NetworkType;
  shouldWrap?: boolean;
};

export const CoinsStatus: FC<CoinsStatusProps> = ({
  coin = null,
  network,
  amount = 1,
  shouldWrap,
  showUsd = true,
  showBtc,
}) => {
  const priceInUsd = useGetTicketPriceInUsd(showUsd);
  const { formatted } = useGetTicketPriceForToken({ coin, amount });
  const { sm } = useMediaQueryMatches();
  const wrapCondition = shouldWrap && !sm;

  return (
    <Flex
      gap={wrapCondition ? 0 : 6}
      align="center"
      css={wrapCondition ? commonStyles.columnReverse : commonStyles.flexRow}
    >
      <Typography css={[styles.textGray, wrapCondition && commonStyles.flexAlignEnd]}>
        {showUsd
          ? priceFormatter(priceInUsd * amount)
          : showBtc
            ? `BTC ${coinFormatter(BTC_PER_TICKET * amount)}`
            : "APPROX"}
      </Typography>

      <Flex gap={6} align="center">
        <Typography css={styles.textWhite}>{formatted}</Typography>
        {coin && <CoinIconProvider token={coin} width={16} height={16} />}
        {network && <NetworkIconProvider chainId={network} />}
      </Flex>
    </Flex>
  );
};
