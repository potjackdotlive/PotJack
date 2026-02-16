import { FC } from "react";
import { useTranslation } from "react-i18next";
import { css, SerializedStyles } from "@emotion/react";
import LoaderWarningIcon from "icons/loader-warning.svg?react";
import CircleClosed from "icons/circle-closed.svg";
import CircleDashed from "icons/circle-dashed.svg";
import CircleOpen from "icons/circle-open.svg";
import RaffleStatusBadge from "pages/Play/components/MainArea/components/RaffleStatusBadge";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { useRaffleRound } from "pages/Play/hooks/useRaffleRound";
import { TXT_CLOSED, TXT_DRAWING_WINNER, TXT_OPEN } from "translations";
import { SOLANA_CHAIN_ID } from "utils/constants/chainsConstants";
import { RaffleStatus, SolanaRaffleStatus } from "utils/enums/raffleStatus";
import { ChainIdType, Nullable } from "utils/types";

const styles = {
  spin: css`
    animation: loadingCircle 1s infinite linear;

    @keyframes loadingCircle {
      100% {
        transform: rotate(360deg);
      }
    }
  `,
  colors: {
    open: css`
      color: var(--color-success-text-success-foreground, #22c55e);
    `,
    closed: css`
      color: var(--color-muted-text-muted-foreground, #a1a1aa);
    `,
    drawing: css`
      color: var(--color-alert-text-alert-foreground, #eab308);
    `,
  },
};

const UI_OPEN = {
  text: TXT_OPEN,
  icon: CircleOpen,
  color: styles.colors.open,
};

const UI_CLOSED = {
  text: TXT_CLOSED,
  icon: CircleClosed,
  color: styles.colors.closed,
};

const UI_DRAWING_WINNER = {
  text: TXT_DRAWING_WINNER,
  icon: CircleDashed,
  color: styles.colors.drawing,
};

type RoundStatusConfig = { text: string; icon: string; color: SerializedStyles };

const statusMapEth: Partial<Record<RaffleStatus, RoundStatusConfig>> = {
  [RaffleStatus.Open]: UI_OPEN,
  [RaffleStatus.NonExistent]: UI_OPEN,
  [RaffleStatus.Closed]: UI_DRAWING_WINNER,
  [RaffleStatus.Completed]: UI_CLOSED,
};

const statusMapSol: Partial<Record<SolanaRaffleStatus, RoundStatusConfig>> = {
  [SolanaRaffleStatus.Open]: UI_OPEN,
  [SolanaRaffleStatus.Completed]: UI_CLOSED,
};

interface StatusConfigByStatusAndNetwork {
  status?: RaffleStatus | SolanaRaffleStatus;
  chainId: Nullable<ChainIdType>;
}

const getStatusConfigByStatusAndNetwork = ({ status, chainId }: StatusConfigByStatusAndNetwork) => {
  if (!status || !chainId) return null;

  if (chainId === SOLANA_CHAIN_ID) {
    return statusMapSol[status as SolanaRaffleStatus];
  }

  return statusMapEth[status];
};

const RaffleBadgeWrapper: FC = () => {
  const { t } = useTranslation();
  const { networkId, roundId = 0, coin, maxRoundForCoin } = usePlayContext();
  const { raffleRoundData, query } = useRaffleRound({ roundId, coin, chainId: networkId });

  const status = raffleRoundData?.round?.status as RaffleStatus | SolanaRaffleStatus | undefined;
  const statusConfig = getStatusConfigByStatusAndNetwork({ status: status, chainId: networkId });
  const isWinnerPresent = !!raffleRoundData?.round?.winnerTicket;

  if (isWinnerPresent) {
    return <RaffleStatusBadge {...UI_CLOSED} />;
  }

  if (roundId === maxRoundForCoin) {
    return <RaffleStatusBadge text={t(TXT_OPEN)} icon={UI_OPEN.icon} color={UI_OPEN.color} />;
  }

  if (
    roundId !== maxRoundForCoin &&
    (networkId === SOLANA_CHAIN_ID ? status === SolanaRaffleStatus.Open : status === RaffleStatus.Open)
  ) {
    return (
      <RaffleStatusBadge text={t(TXT_DRAWING_WINNER)} icon={UI_DRAWING_WINNER.icon} color={UI_DRAWING_WINNER.color} />
    );
  }

  if (query.isLoading) {
    return <LoaderWarningIcon width={18} height={18} css={styles.spin} />;
  }

  if (statusConfig) {
    return <RaffleStatusBadge text={t(statusConfig.text)} icon={statusConfig.icon} color={statusConfig.color} />;
  }
};

export default RaffleBadgeWrapper;
