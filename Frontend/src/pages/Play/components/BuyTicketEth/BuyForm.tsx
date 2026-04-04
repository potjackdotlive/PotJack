import React, { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Flex, Typography } from "antd";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { useWalletConnection } from "hooks/useWalletConnection";
import { CoinsStatus } from "pages/Play/components/BuyTicketEth/components/CoinStatus/CoinStatus";
import { Slippage } from "pages/Play/components/BuyTicketEth/components/Slippage/Slippage";
import { ticketStyles as styles, ticketStyles } from "pages/Play/components/BuyTicketEth/ticketStyles";
import { TicketCounter } from "pages/Play/components/PersonalHub/components/TicketCounter/TicketCounter";
import { DetailsTable } from "pages/Play/components/PersonalHub/DetailsTable";
import { PersonalHubTitle } from "pages/Play/components/PersonalHub/PersonalHubTitle";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { useRaffleRound } from "pages/Play/hooks/useRaffleRound";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_TICKET_PRICE, TXT_TOTAL_ENTRY } from "translations";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { coinFormatter } from "utils/formatters/coinFormatter";
import { getCoinScaledValue } from "utils/getCoinScaledValue";
import { Noop } from "utils/noop";
import { CoinType } from "utils/types";

type FooterLineProps = {
  text: string;
  tokenType: SepoliaCoinType;
  amount: number;
};

const FooterLine: FC<FooterLineProps> = ({ text, tokenType, amount }) => (
  <Flex css={commonStyles.fullWidth} justify="space-between" align="flex-end">
    <Typography css={styles.textGray}>{text}</Typography>
    <CoinsStatus amount={amount} coin={tokenType} shouldWrap showBtc showUsd={false} />
  </Flex>
);

type Props = {
  isNativeEthToken?: boolean;
  raffleStarted: boolean;
  ticketCounter: number;
  incrementTicket: Noop;
  decrementTicket: Noop;
  slippage: string;
  setSlippage: Dispatch<SetStateAction<string>>;
  slippageError: string | null;
  setSlippageError: Dispatch<SetStateAction<string | null>>;
};

export const BuyForm: FC<Props> = ({
  isNativeEthToken,
  raffleStarted,
  ticketCounter,
  incrementTicket,
  decrementTicket,
  setSlippage,
  slippageError,
  setSlippageError,
  slippage,
}) => {
  const { t } = useTranslation();
  const { coin, roundId, networkId } = usePlayContext();
  const { sm } = useMediaQueryMatches();
  const wc = useWalletConnection();

  const { raffleRoundData } = useRaffleRound({ coin, roundId, enabled: true, chainId: networkId });

  const roundData = raffleRoundData?.round;
  const playersData = raffleRoundData?.players || [];

  const playerTicketCount = Number(playersData?.find((pd) => pd?.player === wc.address)?.ticketsCount || 0);

  const poolBalance = Number(roundData?.poolBalance || 0);
  const ticketsCount = roundData?.ticketCount || 0;
  const playersCount = playersData?.length || 0;
  const scaledPool = getCoinScaledValue(poolBalance, coin);

  return (
    <>
      {coin && (
        <div css={styles.detailsWrapper}>
          <PersonalHubTitle coin={coin} roundId={roundId} showTimer={raffleRoundData?.round?.active} />
          <DetailsTable
            playerTicketCount={playerTicketCount}
            playersCount={playersCount}
            ticketsCount={ticketsCount}
            vertical={!sm}
            poolBalance={`${coinFormatter(scaledPool)}`}
          />
        </div>
      )}
      <Flex vertical gap={32} css={commonStyles.fullWidth}>
        <Flex vertical gap={16} css={ticketStyles.slippage}>
          {!isNativeEthToken && (
            <Slippage
              slippage={slippage}
              setSlippage={setSlippage}
              slippageError={slippageError}
              setSlippageError={setSlippageError}
            />
          )}

          <Flex
            css={[commonStyles.fullWidth, isNativeEthToken ? "" : ticketStyles.ticketPrice]}
            align="flex-end"
            justify="space-between"
          >
            <Typography css={[typographyStyles.bodyDefaultRg, commonStyles.textMuted]}>
              {t(TXT_TICKET_PRICE)}
            </Typography>

            <CoinsStatus coin={coin as CoinType} shouldWrap showUsd={false} showBtc />
          </Flex>
        </Flex>

        <TicketCounter
          totalTickets={ticketsCount}
          playerTickets={playerTicketCount}
          ticketCounter={ticketCounter}
          incrementTicket={incrementTicket}
          decrementTicket={decrementTicket}
          raffleStarted={raffleStarted}
        />
        <Flex vertical gap={12}>
          <FooterLine text={t(TXT_TOTAL_ENTRY)} tokenType={coin as SepoliaCoinType} amount={ticketCounter} />
        </Flex>
      </Flex>
      <Divider css={styles.divider} />
    </>
  );
};
