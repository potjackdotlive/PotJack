import { Badges } from "graphql/gen/types";
import { ParticipantExtraStatus } from "utils/types";

type Props = {
  badges?: Badges;
  rank: number | null;
};

export const getExtraStatusesByBadges = ({ rank, badges }: Props) => {
  const statuses: ParticipantExtraStatus[] = [];
  const { hasDiamondBadge, hasWhaleBadge } = badges || {};

  if (rank === 1) {
    statuses.push(ParticipantExtraStatus.Leader);
  }

  if (hasDiamondBadge) {
    statuses.push(ParticipantExtraStatus.Diamond);
  }

  if (hasWhaleBadge) {
    statuses.push(ParticipantExtraStatus.Whale);
  }

  return statuses;
};
