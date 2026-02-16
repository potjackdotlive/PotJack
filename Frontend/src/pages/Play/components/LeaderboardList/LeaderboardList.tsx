import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button, Divider, Flex } from "antd";
import { DashboardUserStats, SelfStatsType } from "graphql/gen/responseTypes";
import { useWalletConnection } from "hooks/useWalletConnection";
import { leaderboardListStyles } from "pages/Play/components/LeaderboardList/leaderboardListStyles";
import { Participant } from "pages/Play/components/LeaderboardList/Participant";
import { commonStyles } from "styles/commonStyles";
import { TXT_LOAD_MORE } from "translations";
import { Noop } from "utils/noop";

type Props = {
  showLoadMore: boolean;
  selfStats: SelfStatsType[];
  participants: DashboardUserStats[];
  loadMoreParticipants: Noop;
};

export const LeaderboardList: FC<Props> = ({ selfStats, showLoadMore, participants, loadMoreParticipants }) => {
  const { t } = useTranslation();
  const { address } = useWalletConnection();

  const getListItemKey = useMemo(
    () => (p: DashboardUserStats | SelfStatsType) =>
      `${p.rank}-${p?.userAddress}-${p?.contractAddress}-${p?.totalWins}`,
    [],
  );

  const participantsWithoutSelf = participants.filter((p) => p.userAddress !== address);
  const showDivider = !!selfStats?.length && !!participantsWithoutSelf?.length;

  return (
    <Flex gap={8} vertical css={leaderboardListStyles.root}>
      {selfStats.map((p) => (
        <Participant {...p} key={getListItemKey(p)} />
      ))}
      {showDivider && <Divider />}
      <Flex gap={8} vertical css={leaderboardListStyles.otherParticipants}>
        {participantsWithoutSelf.map((p) => (
          <Participant {...p} key={getListItemKey(p)} hideSelf />
        ))}
      </Flex>
      {showLoadMore && (
        <Flex css={leaderboardListStyles.loadMoreWrapper}>
          <Button ghost css={commonStyles.fullWidth} onClick={loadMoreParticipants}>
            {t(TXT_LOAD_MORE)}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
