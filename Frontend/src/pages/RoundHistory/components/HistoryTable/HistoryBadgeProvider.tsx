import React from "react";
import { LeaderExtraStatusIcon } from "components/LeaderExtraStatusIcon/LeaderExtraStatusIcon";
import { Badges } from "graphql/gen/types";
import { ParticipantExtraStatus } from "utils/types";

type Props = {
  badges: Badges;
};

export const HistoryBadgeProvider: React.FC<Props> = ({ badges }) => {
  switch (true) {
    case badges.hasCrownBadge:
      return <LeaderExtraStatusIcon status={ParticipantExtraStatus.Leader} width={16} height={16} color="#facc15" />;
    case badges.hasDiamondBadge:
      return <LeaderExtraStatusIcon status={ParticipantExtraStatus.Diamond} width={16} height={16} color="#38bdf8" />;
    case badges.hasWhaleBadge:
      return <LeaderExtraStatusIcon status={ParticipantExtraStatus.Whale} width={16} height={16} color="#e879f9" />;
    default:
      return <></>;
  }
};
