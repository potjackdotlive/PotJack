import { FC, ReactNode } from "react";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import ArrowRightIcon from "icons/li_arrow-right.svg?react";
import { PoolCounter } from "components/ActiveEntries/PoolCounter";
import { TicketCounter } from "components/ActiveEntries/TicketCounter";
import { Button } from "components/Button/Button";
import { CoinIconProvider } from "components/CoinIconProvider/CoinIconProvider";
import { TimerContext } from "pages/Play/components/RaffleListItem/contexts/TimerContext/TimerContext";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { useLastRounds } from "pages/Play/hooks/useLastRounds";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
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
    background: var(--color-muted-background-muted, #27272a);
  `,
  button: css`
    height: auto;
    display: flex;
    padding: 0 12px;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 16px;
    background: var(--color-primary-background-secondary, rgba(168, 85, 247, 0.1));
  `,
};

type EntryItemProps = {
  coin: SepoliaCoinType;
  playerTickets: number;
  totalTickets: number;
  prizePool: number;
  handleClose: () => void;
};

export const EntryItemSmall: FC<EntryItemProps> = ({
  coin,
  playerTickets,
  totalTickets,
  prizePool,
  handleClose,
}): ReactNode => {
  const { setCoin, setRoundData, networkId } = usePlayContext();
  const { data } = useLastRounds();

  const roundId = data?.[networkId as ChainIdType]?.[coin]?.actualRoundId;
  const isActive = data?.[networkId as ChainIdType]?.[coin]?.active;

  const handleSelectCoin = () => {
    setCoin(coin);
    setRoundData({ roundId: roundId, active: isActive, maxRoundForCoin: roundId });
    handleClose();
  };

  return (
    <div css={styles.root}>
      <Flex gap={20} css={[commonStyles.fullWidth]} justify="space-between">
        <Flex gap={12} justify="space-between" css={[commonStyles.fullWidth]}>
          <Flex vertical gap={16} flex={1}>
            <Flex gap={8} align="center">
              <CoinIconProvider token={coin} height={24} width={24} />
              <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textNeutral]}>{coin}</Typography>
            </Flex>
            <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>
              <TimerContext />
            </Typography>
          </Flex>

          <Flex align="flex-end" justify="flex-end" vertical gap={16} css={commonStyles.fullWidth} flex={1}>
            <PoolCounter pool={getCoinScaledValue(prizePool, coin)} />
            <TicketCounter userTickets={playerTickets || 0} totalTickets={totalTickets || 0} />
          </Flex>
        </Flex>

        <Button transparent size="sm" onClick={handleSelectCoin} css={styles.button}>
          <ArrowRightIcon />
        </Button>
      </Flex>
    </div>
  );
};
