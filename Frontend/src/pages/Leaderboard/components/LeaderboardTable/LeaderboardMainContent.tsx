import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, List, Pagination, Spin, Typography } from "antd";
import { css } from "@emotion/react";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import VirtualList from "rc-virtual-list";
import { Button } from "components/Button/Button";
import { ParticipantTooltip } from "components/ParticipantTooltip/ParticipantTooltip";
import { SelfStatsType } from "graphql/gen/responseTypes";
import { GetUserSelfStatsQuery, Maybe, UserStats } from "graphql/gen/types";
import { LeaderboardParticipant } from "pages/Leaderboard/components/LeaderboardTable/LeaderboardParticipant";
import { PaginationRenderer } from "pages/Leaderboard/components/LeaderboardTable/PaginationRenderer";
import { leaderboardTableStyles as styles } from "pages/Leaderboard/components/LeaderboardTable/styles/leaderboardTableStyles";
import { LEADERS_LIMIT } from "pages/Leaderboard/utils";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import {
  TXT_CLEAR_SEARCH,
  TXT_NO_LEADERS_SEARCH_RESULT,
  TXT_RANK,
  TXT_SIMPLE_PAGINATION,
  TXT_TICKETS,
  TXT_TOTAL_WINS,
  TXT_WALLET,
} from "translations";
import { Noop } from "utils/noop";
import SelfParticipant from "./SelfParticipant";

type Props = {
  loading: boolean;
  data: Omit<UserStats, "contractAddress" | "roundId" | "tokenAddress">[];
  selfData?: GetUserSelfStatsQuery;
  showSelf: boolean;
  selfStat: Maybe<SelfStatsType>;
  totalElements: number;
  currentPage: number;
  changePageHandler: (page: number) => void;
  totalPages: number;
  noSearchResults?: boolean;
  handleClearSearch: Noop;
};

export const LeaderboardMainContent: FC<Props> = ({
  loading,
  data,
  selfData,
  showSelf,
  selfStat,
  totalElements,
  currentPage,
  changePageHandler,
  totalPages,
  noSearchResults,
  handleClearSearch,
}) => {
  const { t } = useTranslation();
  const { xs, md } = useBreakpoint();
  const headTitleStyles = [typographyStyles.bodyDefaultMd, commonStyles.textMuted, commonStyles.fullWidth];

  return (
    <>
      {!xs && (
        <Flex
          css={css`
            justify-content: space-evenly;
            align-items: flex-start;
            padding: 0 12px;
          `}
        >
          <Typography css={headTitleStyles}>{t(TXT_RANK)}</Typography>
          <Typography css={headTitleStyles}>{t(TXT_WALLET)}</Typography>
          <Typography css={headTitleStyles}>{t(TXT_TICKETS)}</Typography>
          <Typography css={headTitleStyles}>{t(TXT_TOTAL_WINS)}</Typography>
        </Flex>
      )}
      {loading && <Spin size="large" css={styles.spin} />}
      {noSearchResults && (
        <Flex gap={16} vertical align="center" justify="center" css={styles.noResultsWrapper}>
          <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>
            {t(TXT_NO_LEADERS_SEARCH_RESULT)}
          </Typography>
          <Button transparent variant="destructive" onClick={handleClearSearch}>
            {t(TXT_CLEAR_SEARCH)}
          </Button>
        </Flex>
      )}
      {data.length ? (
        <>
          <List {...(!md && { style: { position: "relative", marginTop: 16, marginBottom: -4 } })}>
            <VirtualList data={data} itemHeight={64} itemKey="email">
              {(participant) => (
                <ParticipantTooltip key={participant.userAddress} placement="bottomLeft" {...participant} copyable>
                  <List.Item>
                    <LeaderboardParticipant selfData={selfData} {...participant} />
                  </List.Item>
                </ParticipantTooltip>
              )}
            </VirtualList>
            {showSelf && (
              <ParticipantTooltip placement="bottomLeft" {...selfData}>
                <SelfParticipant selfStat={selfStat} />
              </ParticipantTooltip>
            )}
          </List>
          {!!totalElements && totalElements > LEADERS_LIMIT && (
            <div css={styles.paginationWrapper}>
              <Pagination
                responsive
                align="center"
                pageSize={LEADERS_LIMIT}
                total={totalElements}
                current={currentPage}
                css={styles.pagination}
                showQuickJumper={false}
                showSizeChanger={false}
                itemRender={PaginationRenderer}
                onChange={changePageHandler}
                {...(!md ? { simple: { readOnly: true } } : { simple: false })}
              />
              {!md && (
                <Typography css={[styles.simplePager, typographyStyles.bodyDefaultMd]}>
                  {t(TXT_SIMPLE_PAGINATION, { currentPage: currentPage, totalPages })}
                </Typography>
              )}
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
