import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { SelfStatsType } from "graphql/gen/responseTypes";
import { Maybe } from "graphql/gen/types";
import ParticipantContent from "pages/Leaderboard/components/LeaderboardTable/ParticipantContent";
import { selfParticipantStyles } from "pages/Leaderboard/components/LeaderboardTable/styles/selfParticipantStyles";
import { typographyStyles } from "styles/typography";
import { TXT_YOUR_RANK } from "translations";

type Props = {
  selfStat?: Maybe<SelfStatsType>;
};

const SelfParticipant: FC<Props> = ({ selfStat }) => {
  const { xs } = useBreakpoint();
  const { t } = useTranslation();

  if (!selfStat) {
    return null;
  }

  if (xs) {
    return (
      <Flex vertical css={selfParticipantStyles.root}>
        <Typography css={[typographyStyles.bodySmallMd, selfParticipantStyles.title]}>{t(TXT_YOUR_RANK)}</Typography>
        <Flex gap={20} align="center" justify="space-between" css={selfParticipantStyles.content}>
          <ParticipantContent
            isSelf
            showTopInfo={false}
            userAddress={selfStat?.userAddress}
            rank={selfStat?.rank || 0}
            badges={selfStat.badges}
            tickets={selfStat.tickets}
            totalWins={selfStat.totalWins}
          />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex vertical css={selfParticipantStyles.root}>
      <Typography css={[typographyStyles.bodySmallMd, selfParticipantStyles.title]}>{t(TXT_YOUR_RANK)}</Typography>
      <Flex
        align="center"
        justify="space-between"
        css={[selfParticipantStyles.content, selfParticipantStyles.contentDesktop]}
      >
        <ParticipantContent
          isSelf
          userAddress={selfStat?.userAddress}
          rank={selfStat?.rank || 0}
          badges={selfStat.badges}
          tickets={selfStat.tickets}
          totalWins={selfStat.totalWins}
        />
      </Flex>
    </Flex>
  );
};

export default SelfParticipant;
