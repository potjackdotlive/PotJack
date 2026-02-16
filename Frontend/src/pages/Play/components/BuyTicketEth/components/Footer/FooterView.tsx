import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import { Button } from "components/Button/Button";
import { CoinIconProvider } from "components/CoinIconProvider/CoinIconProvider";
import { NetworkIconProvider } from "components/NetworkIconProvider/NetworkIconProvider";
import { warningNotification } from "components/Notification/Notification";
import { ticketStyles as styles } from "pages/Play/components/BuyTicketEth/ticketStyles";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { commonStyles } from "styles/commonStyles";
import { TXT_BUY_TICKETS, TXT_LOOKS_LIKE_YOU_DONT_HAVE, TXT_TOKEN_IN_WALLET, TXT_YOU_NEED_TO_ADD } from "translations";
import { NetworkType } from "utils/enums/networks";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { coinFormatter } from "utils/formatters/coinFormatter";
import { Noop } from "utils/noop";
import { CoinType } from "utils/types";

type CoinsStatusProps = {
  coinAmount: number;
  coin?: SepoliaCoinType;
  network?: NetworkType;
};

const CoinBalance: FC<CoinsStatusProps> = ({ coinAmount, coin, network }) => (
  <Flex gap={6} align="center">
    <Typography css={styles.textWhite}>{coinFormatter(coinAmount)}</Typography>
    {coin && <CoinIconProvider token={coin} width={16} height={16} />}
    {network && <NetworkIconProvider chainId={network} />}
  </Flex>
);

type FooterViewProps = {
  balance: number;
  canBuy: boolean;
  token: CoinType | null;
  buyHandler: Noop;
};

export const FooterView = ({ buyHandler, balance, canBuy, token }: FooterViewProps) => {
  const { t } = useTranslation();
  const { coin } = usePlayContext();

  const purchaseHandle = () => {
    if (!balance) {
      warningNotification({
        message: t(TXT_LOOKS_LIKE_YOU_DONT_HAVE, { token }),
        description: t(TXT_YOU_NEED_TO_ADD, { token }),
        duration: 5,
      });
      return;
    }

    if (canBuy) {
      buyHandler();
    }
  };

  return (
    <Flex justify="space-between" css={commonStyles.fullWidth} gap={6} align="center">
      <Flex vertical gap={0} align="flex-start">
        <div css={commonStyles.fullWidth}>
          <Typography css={styles.textGray} style={{ textAlign: "left" }}>
            {t(TXT_TOKEN_IN_WALLET, { token: coin })}:
          </Typography>
        </div>
        <CoinBalance coinAmount={balance} coin={coin as SepoliaCoinType} />
      </Flex>
      <div>
        <Button
          onClick={purchaseHandle}
          css={
            !canBuy &&
            css`
              opacity: 0.5;
              cursor: not-allowed;
            `
          }
        >
          {t(TXT_BUY_TICKETS)}
        </Button>
      </div>
    </Flex>
  );
};
