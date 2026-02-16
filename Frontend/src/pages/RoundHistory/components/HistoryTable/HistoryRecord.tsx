import { FC, PropsWithChildren, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import { format } from "date-fns";
import ArrowUpRightIcon from "icons/li_arrow-up-right.svg?react";
import TicketIcon from "icons/li_ticket.svg?react";
import { Address } from "viem";
import { CoinIconProvider } from "components/CoinIconProvider/CoinIconProvider";
import { WinEvent } from "graphql/gen/types";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { HistoryBadgeProvider } from "pages/RoundHistory/components/HistoryTable/HistoryBadgeProvider";
import { defineColorCssByBadge, getTransactionExplorerLink } from "pages/RoundHistory/components/HistoryTable/utils";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_COIN, TXT_FINISH, TXT_PLAYERS, TXT_PRIZE_POOL, TXT_WALLET, TXT_WINNING_TICKET } from "translations";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { addressFormatter } from "utils/formatters/addressFormatter";
import { getAddressToTokenSet } from "utils/getAddressToTokenSet";
import { getChainIdByContractAddress } from "utils/getChainIdByContractAddress";
import { getCoinDecimals } from "utils/getCoinDecimals";
import { getCoinFullName } from "utils/getCoinFullName";
import { ChainIdType, CoinType } from "utils/types";
import { historyRecordStyles as styles } from "./historyRecordStyles";

type Size = {
  size: "sm" | "md" | "lg";
};

const Label = ({ text, show }: { text: string; show: boolean }) => {
  if (!show) {
    return null;
  }

  const labelStyles = [typographyStyles.bodyDefaultMd, commonStyles.textMuted];

  return <Typography css={labelStyles}>{text}</Typography>;
};

const Wrapper: FC<PropsWithChildren<Size>> = ({ children, size }) => {
  if (size === "lg") {
    return <>{children}</>;
  }

  const isSmall = size === "sm";

  return (
    <Flex
      css={[
        commonStyles.fullWidth,
        css`
          flex-wrap: wrap;
          row-gap: 16px;
          column-gap: 16px;
          gap: 8px;

          & > .ant-flex {
            width: 30%;
            flex: auto;
          }
        `,
        isSmall &&
          css`
            & > .ant-flex {
              column-gap: 0;
              flex-basis: 35%;
            }
          `,
      ]}
    >
      {children}
    </Flex>
  );
};

type Props = WinEvent &
  Size & {
    shouldFetchOnIntersect?: boolean;
    fetchNextPage?: () => void;
  };

export const HistoryRecord: FC<Props> = ({
  roundId,
  transactionHash,
  amount,
  blockTimestamp,
  token,
  contractAddress,
  winner,
  ticketId,
  playersCount,
  shouldFetchOnIntersect = false,
  fetchNextPage,
  size,
}) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const showLabels = size !== "lg";
  const isSmall = size === "sm";
  const { lg } = useMediaQueryMatches();

  useEffect(() => {
    if (!shouldFetchOnIntersect || !fetchNextPage || !ref) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0 },
    );

    if (ref?.current) {
      observer.observe(ref.current as HTMLHeadingElement);
    }

    return () => observer.disconnect();
  }, [shouldFetchOnIntersect, ref]);

  let className = "";

  if (!showLabels) {
    className += " evenChildren";
  }

  const explorerLink = getTransactionExplorerLink({ contractAddress, transactionHash });

  const chainId = getChainIdByContractAddress(contractAddress);

  const tokenSet = getAddressToTokenSet(chainId as ChainIdType);
  const coin = tokenSet && tokenSet[token as Address];
  const round = Number(roundId) + 1;

  const formatPool = useMemo(
    () =>
      (num: number, maxDecimals: number = 5) => {
        const number = Number(num);

        if (isNaN(number)) {
          return "Invalid number";
        }

        const parsed = number / getCoinDecimals(coin);

        return parseFloat(parsed.toFixed(maxDecimals));
      },
    [],
  );

  const pool = formatPool(Number(amount));

  return (
    <Flex
      css={styles.root}
      className={className}
      vertical={isSmall}
      gap={isSmall ? 24 : 8}
      onDoubleClick={() => {
        window.open(explorerLink, "_blank");
      }}
      ref={ref}
    >
      {isSmall && (
        <Flex css={commonStyles.fullWidth} justify="space-between" gap={8}>
          <div css={styles.position}>{round}</div>
          <Link
            to={explorerLink}
            target="_blank"
            css={css`
              display: inline-flex;
            `}
          >
            <Typography css={[typographyStyles.monoDefaultMd, commonStyles.textNeutral]}>
              <ArrowUpRightIcon />
            </Typography>
          </Link>
        </Flex>
      )}

      {!isSmall && (
        <Flex gap={12} style={{ minWidth: 80 }}>
          <div css={styles.position}>{round}</div>
        </Flex>
      )}

      <Wrapper size={size}>
        <Flex
          align="flex-start"
          vertical
          css={css`
            min-width: 137px;
          `}
        >
          <Label text={t(TXT_WALLET)} show={showLabels} />
          <Flex
            vertical={false}
            gap={8}
            css={[
              defineColorCssByBadge(winner.badges),
              css`
                min-width: 137px;
              `,
            ]}
          >
            <Typography css={[typographyStyles.monoDefaultMd]}>{addressFormatter(winner.address)}</Typography>
            <Flex gap={4}>
              <HistoryBadgeProvider badges={winner.badges} />
            </Flex>
          </Flex>
        </Flex>
        <Flex align="flex-start" vertical>
          <Label text={t(TXT_COIN)} show={showLabels} />
          <Typography css={[typographyStyles.bodyDefaultMd, styles.chain]}>
            {coin ? getCoinFullName(coin as SepoliaCoinType) : ""}
          </Typography>
        </Flex>
        <Flex align="flex-start" vertical justify="center">
          <Label text={t(TXT_PRIZE_POOL)} show={showLabels} />
          <Flex gap={8} align="center">
            <CoinIconProvider token={coin as CoinType} width={16} height={16} />
            <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textNeutral]}>{pool}</Typography>
          </Flex>
        </Flex>
        <Flex align="flex-start" vertical>
          <Label text={t(TXT_PLAYERS)} show={showLabels} />
          <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>{playersCount}</Typography>
        </Flex>
        <Flex
          align="flex-start"
          vertical
          css={css`
            min-width: 106px;
          `}
        >
          <Label text={t(TXT_WINNING_TICKET)} show={showLabels} />
          <Flex gap={8} css={commonStyles.textAlert} align="center">
            <TicketIcon />
            <Typography css={[typographyStyles.bodyDefaultMd]}>{Number(ticketId) + 1}</Typography>
          </Flex>
        </Flex>
        <Flex align="flex-start" vertical>
          <Label text={t(TXT_FINISH)} show={showLabels} />
          <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>
            {format(new Date(Number(blockTimestamp)), "HH:mm, MMMM d, yyyy")}
          </Typography>
        </Flex>
      </Wrapper>

      {explorerLink && (
        <>
          {!isSmall && (
            <Flex
              gap={8}
              align="center"
              justify="end"
              css={
                lg
                  ? css`
                      align-self: center;
                    `
                  : css`
                      align-self: flex-start;
                    `
              }
            >
              <Link
                to={explorerLink}
                target="_blank"
                css={css`
                  display: inline-flex;
                `}
              >
                <Typography
                  css={[
                    typographyStyles.monoDefaultMd,
                    commonStyles.textNeutral,
                    css`
                      display: inline-flex;
                    `,
                  ]}
                >
                  <ArrowUpRightIcon />
                </Typography>
              </Link>
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
};
