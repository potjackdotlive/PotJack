import React, { FC, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import MinusIcon from "icons/li_minus.svg?react";
import PlusIcon from "icons/li_plus.svg?react";
import { IconButton } from "components/IconButton/IconButton";
import { useGetTicketPriceForToken } from "hooks/abi/useGetTicketPriceForToken";
import { ticketCounterStyles as styles } from "pages/Play/components/PersonalHub/components/TicketCounter/ticketCounterStyles";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { commonStyles } from "styles/commonStyles";
import { TXT_CHANCE_TO_YOUR_ODDS, TXT_FIRST_BUYER_REWARD, TXT_TICKETS } from "translations";
import { RiskType } from "utils/enums/risks";
import { amountFormatter } from "utils/formatters/amountFormatter";
import { getColorClassNameForRisk } from "utils/getColorClassNameForRisk";
import { getRiskByWinOdds } from "utils/getRiskByWinOdds";
import { Noop } from "utils/noop";

type Props = {
  playerTickets: number;
  ticketCounter: number;
  incrementTicket: Noop;
  decrementTicket: Noop;
  totalTickets: number;
  raffleStarted: boolean;
};

const countToOddsConverter = ({ playerTickets, totalTickets }: Pick<Props, "playerTickets" | "totalTickets">) =>
  (playerTickets / totalTickets) * 100;

export const TicketCounter: FC<Props> = ({
  totalTickets,
  playerTickets,
  ticketCounter,
  incrementTicket,
  decrementTicket,
  raffleStarted,
}) => {
  const { t } = useTranslation();
  const { coin } = usePlayContext();
  const { firstBuyerReward } = useGetTicketPriceForToken({ coin, amount: ticketCounter }, totalTickets === 0);
  const [totalOdds, setTotalOdds] = useState(0);

  const playerOdds = countToOddsConverter({ playerTickets, totalTickets });

  const incrementCounter = () => {
    incrementTicket();
  };

  const decrementCounter = () => {
    if (ticketCounter === 1) {
      return;
    }

    decrementTicket();
  };

  useEffect(() => {
    setTotalOdds(() =>
      countToOddsConverter({
        totalTickets: totalTickets + ticketCounter,
        playerTickets: ticketCounter + playerTickets,
      }),
    );
  }, [ticketCounter, totalTickets, playerTickets]);

  return (
    <Flex vertical gap={8} css={styles.root} align="center">
      <Typography>{t(TXT_TICKETS)}</Typography>
      <Flex css={styles.counterWrapper}>
        <IconButton ghost size="lg" onClick={decrementCounter} disabled={ticketCounter === 1}>
          <MinusIcon width={20} height={20} />
        </IconButton>
        <Flex css={[commonStyles.fullWidth, styles.counterText]} align="center" justify="center">
          <Typography>{ticketCounter}</Typography>
        </Flex>
        <IconButton ghost size="lg" onClick={incrementCounter}>
          <PlusIcon width={20} height={20} />
        </IconButton>
      </Flex>
      {raffleStarted ? (
        <Typography css={styles.odds} className={getColorClassNameForRisk(getRiskByWinOdds(totalOdds))}>
          <Trans
            i18nKey={TXT_CHANCE_TO_YOUR_ODDS}
            defaults="<bold>+{{percentage}}%</bold> to your odds"
            values={{ percentage: amountFormatter(totalOdds - playerOdds) }}
            components={{ bold: <strong /> }}
          />
        </Typography>
      ) : (
        <Typography css={styles.odds} className={getColorClassNameForRisk(RiskType.Medium)}>
          <Trans
            i18nKey={TXT_FIRST_BUYER_REWARD}
            defaults="<bold>+{{amount}} {{coin}}</bold> First Buyer reward"
            values={{ amount: firstBuyerReward, coin }}
            components={{ bold: <strong /> }}
          />
        </Typography>
      )}
    </Flex>
  );
};
