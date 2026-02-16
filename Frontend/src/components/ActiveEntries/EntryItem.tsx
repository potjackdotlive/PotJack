import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import { PoolCounter } from "components/ActiveEntries/PoolCounter";
import { TicketCounter } from "components/ActiveEntries/TicketCounter";
import { Button } from "components/Button/Button";
import { CoinIconProvider } from "components/CoinIconProvider/CoinIconProvider";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { TimerContext } from "pages/Play/components/RaffleListItem/contexts/TimerContext/TimerContext";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { useLastRounds } from "pages/Play/hooks/useLastRounds";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_VISIT } from "translations";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { getCoinScaledValue } from "utils/getCoinScaledValue";
import { ChainIdType } from "utils/types";

const styles = {
  root: css`
    display: flex;
    padding: 12px;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    border-radius: 18px;
    background: var(--color-neutral-background-neutral, #131313);
  `,
};

type EntryItemProps = {
  coin: SepoliaCoinType;
  playerTickets: number;
  totalTickets: number;
  prizePool: number;
  endTime: number;
};

export const EntryItem: FC<EntryItemProps> = ({ coin, playerTickets, totalTickets, prizePool }): ReactNode => {
  const { setCoin, setRoundData, networkId } = usePlayContext();
  const { t } = useTranslation();
  const { lg } = useMediaQueryMatches();
  const { data } = useLastRounds();

  const roundId = data?.[networkId as ChainIdType]?.[coin]?.actualRoundId;
  const isActive = data?.[networkId as ChainIdType]?.[coin]?.active;

  const handleSelectCoin = () => {
    setCoin(coin);
    setRoundData({ roundId: roundId, active: isActive, maxRoundForCoin: roundId });
  };

  return (
    <div css={styles.root}>
      <Flex gap={20} align="center" style={{ minWidth: "fit-content" }}>
        <Flex gap={12} align="center">
          <Flex gap={8} align="center">
            <CoinIconProvider token={coin} height={24} width={24} />
            <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textNeutral]}>{coin}</Typography>
          </Flex>

          <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>
            <TimerContext showOnlyCurrentRound />
          </Typography>
        </Flex>
      </Flex>
      <Flex justify="space-between" css={commonStyles.fullWidth}>
        <PoolCounter pool={getCoinScaledValue(prizePool, coin)} />
        <Flex gap={lg ? 16 : 20}>
          <TicketCounter userTickets={playerTickets || 0} totalTickets={totalTickets || 0} />
          <Button transparent size="sm" onClick={handleSelectCoin}>
            {t(TXT_VISIT)}
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};
