import { FC, useMemo } from "react";
import { Flex } from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { LeaderboardPageUserStats } from "graphql/gen/responseTypes";
import { GetUserSelfStatsQuery } from "graphql/gen/types";
import { getPositionClassName } from "utils/getPositionClassName";
import ParticipantContent from "./ParticipantContent";
import { leaderboardParticipantStyles } from "./styles/leaderboardParticipantStyles";

type LeaderboardParticipantProps = {
  selfData?: GetUserSelfStatsQuery;
} & LeaderboardPageUserStats;

export const LeaderboardParticipant: FC<LeaderboardParticipantProps> = (props) => {
  const { xs } = useBreakpoint();
  const { rank = 0, userAddress, selfData } = props;

  const isSelf = useMemo(
    () => userAddress === selfData?.selfStats?.find((item) => item.userAddress === userAddress)?.userAddress,
    [userAddress, selfData],
  );

  if (xs) {
    return (
      <Flex css={leaderboardParticipantStyles.rootMobile} className={getPositionClassName(rank)}>
        <ParticipantContent isSelf={isSelf} {...props} />
      </Flex>
    );
  }

  return (
    <Flex
      css={[leaderboardParticipantStyles.root, isSelf && leaderboardParticipantStyles.selfRoot]}
      className={getPositionClassName(rank)}
    >
      <ParticipantContent isSelf={isSelf} {...props} />
    </Flex>
  );
};
