import React from "react";
import { useTranslation } from "react-i18next";
import { Flex, List, Spin, Typography } from "antd";
import { css } from "@emotion/react";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import VirtualList from "rc-virtual-list";
import { GetRoundHistoryStatsQuery, WinEvent } from "graphql/gen/types";
import { leaderboardTableStyles as styles } from "pages/Leaderboard/components/LeaderboardTable/styles/leaderboardTableStyles";
import { HistoryRecord } from "pages/RoundHistory/components/HistoryTable/HistoryRecord";
import { NothingFound } from "pages/RoundHistory/components/HistoryTable/NothingFound";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import {
  TXT_COIN,
  TXT_FINISH,
  TXT_PLAYERS,
  TXT_PRIZE_POOL,
  TXT_ROUND,
  TXT_VERIFY,
  TXT_WALLET,
  TXT_WINNING_TICKET,
} from "translations";

type Props = {
  data?: GetRoundHistoryStatsQuery["winStats"]["content"];
  resetFilters: () => void;
  isLoading: boolean;
  loadMore: () => void;
  canLoadMore: boolean;
};

export const HistoryTable: React.FC<Props> = ({ data, resetFilters, isLoading, loadMore, canLoadMore }) => {
  const { t } = useTranslation();
  const { lg, md } = useBreakpoint();

  const headTitleStyles = [typographyStyles.bodyDefaultMd, commonStyles.textMuted, commonStyles.fullWidth];

  const itemHeight = lg ? 80 : md ? 111 : 200;

  return (
    <div css={styles.root} style={lg ? {} : { padding: 0, border: "none" }}>
      {lg && (
        <Flex
          css={css`
            justify-content: space-evenly;
            align-items: flex-start;
            padding: 0 12px;
            gap: 8px;
          `}
        >
          <Typography css={headTitleStyles}>{t(TXT_ROUND)}</Typography>
          <Typography
            css={[
              headTitleStyles,
              css`
                min-width: 137px;
              `,
            ]}
          >
            {t(TXT_WALLET)}
          </Typography>
          <Typography css={headTitleStyles}>{t(TXT_COIN)}</Typography>
          <Typography css={headTitleStyles}>{t(TXT_PRIZE_POOL)}</Typography>
          <Typography css={headTitleStyles}>{t(TXT_PLAYERS)}</Typography>
          <Typography
            css={[
              headTitleStyles,
              css`
                min-width: 106px;
              `,
            ]}
          >
            {t(TXT_WINNING_TICKET)}
          </Typography>
          <Typography css={headTitleStyles}>{t(TXT_FINISH)}</Typography>
          <Typography css={headTitleStyles} style={{ textAlign: "end" }}>
            {t(TXT_VERIFY)}
          </Typography>
        </Flex>
      )}

      {isLoading && !data?.length ? (
        <Flex justify="center" align="center" css={[commonStyles.fullWidth, commonStyles.fullHeight]}>
          <Spin size="large" />
        </Flex>
      ) : (
        <>
          {data?.length ? (
            <List>
              <VirtualList
                data={data}
                height={
                  data?.length > 5 ? itemHeight * data?.length : itemHeight * data.length + 8 * data.length - 1 + 20
                }
                itemHeight={itemHeight}
                itemKey="transactionHash"
              >
                {(record: WinEvent, index: number) => (
                  <List.Item key={record.transactionHash} style={{ marginBottom: lg ? 8 : 4 }}>
                    <HistoryRecord
                      {...record}
                      shouldFetchOnIntersect={canLoadMore && index === data.length - 1}
                      fetchNextPage={loadMore}
                      size={lg ? "lg" : md ? "md" : "sm"}
                    />
                  </List.Item>
                )}
              </VirtualList>
              {isLoading && (
                <Flex justify="center" align="center" css={[commonStyles.fullWidth, commonStyles.fullHeight]}>
                  <Spin size="large" />
                </Flex>
              )}
            </List>
          ) : (
            <NothingFound resetFilters={resetFilters} />
          )}
        </>
      )}
    </div>
  );
};
