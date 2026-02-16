import { useTranslation } from "react-i18next";
import { Flex, Spin } from "antd";
import ChipButton from "components/ChipButton/ChipButton";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import InfoTitle from "pages/Play/components/InfoTitle";
import { LeaderboardList } from "pages/Play/components/LeaderboardList/LeaderboardList";
import { PlayContainer } from "pages/Play/components/PlayContainer/PlayContainer";
import { RaffleNotStarted } from "pages/Play/components/RaffleNotStarted/RaffleNotStarted";
import { usePlayersBlock } from "pages/Play/hooks/usePlayersBlock";
import { playStyles as styles } from "pages/Play/styles";
import { commonStyles } from "styles/commonStyles";
import {
  TXT_ALL_POOLS,
  TXT_LEADERBOARD,
  TXT_LEADERBOARD_INFO,
  TXT_PARTICIPANTS,
  TXT_PARTICIPANTS_INFO,
} from "translations";
import { getChainFullName } from "utils/getChainFullName";
import { getColorByChain } from "utils/getColorByChain";

export const PlayersBlock = () => {
  const { t } = useTranslation();
  const { xl } = useMediaQueryMatches();

  const {
    loading,
    loadMoreParticipants,
    isSelfDataLoading,
    chainId,
    coin,
    showRaffleNotStarted,
    currentPage,
    selfData,
    leadersData,
    showParticipants,
  } = usePlayersBlock();

  return (
    <PlayContainer css={[styles.sideBar, !xl && commonStyles.fullWidth]}>
      <Flex justify="space-between" gap={8} css={commonStyles.fullWidth}>
        <InfoTitle
          main={showParticipants ? t(TXT_PARTICIPANTS) : t(TXT_LEADERBOARD)}
          info={showParticipants ? t(TXT_PARTICIPANTS_INFO) : t(TXT_LEADERBOARD_INFO)}
        />
        {coin ? (
          <ChipButton text={coin} size="small" coin={coin} />
        ) : (
          <ChipButton
            text={chainId ? getChainFullName(chainId) : t(TXT_ALL_POOLS)}
            size="small"
            pinColor={getColorByChain(chainId)}
          />
        )}
      </Flex>

      {loading || isSelfDataLoading ? (
        <Flex justify="center" align="center" css={[commonStyles.fullWidth, commonStyles.fullHeight]}>
          <Spin size="large" />
        </Flex>
      ) : (
        <>
          {showRaffleNotStarted ? (
            <RaffleNotStarted />
          ) : (
            <LeaderboardList
              selfStats={selfData?.selfStats || []}
              showLoadMore={(leadersData?.userStats?.totalPages || 0) > currentPage}
              participants={leadersData?.userStats?.content || []}
              loadMoreParticipants={loadMoreParticipants}
            />
          )}
        </>
      )}
    </PlayContainer>
  );
};
