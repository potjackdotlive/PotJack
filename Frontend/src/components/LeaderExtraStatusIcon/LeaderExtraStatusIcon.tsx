import { FC, ReactNode, SVGProps } from "react";
import LeaderIcon from "icons/sp_badge_crown.svg?react";
import DiamondIcon from "icons/sp_badge_diamond.svg?react";
import WhaleIcon from "icons/sp_badge_whale.svg?react";
import { ParticipantExtraStatus } from "utils/types";

type Props = {
  status: ParticipantExtraStatus;
} & SVGProps<SVGSVGElement>;

export const LeaderExtraStatusIcon: FC<Props> = ({ status, ...props }): ReactNode => {
  switch (status) {
    case ParticipantExtraStatus.Whale:
      return <WhaleIcon {...props} />;
    case ParticipantExtraStatus.Leader:
      return <LeaderIcon {...props} />;
    case ParticipantExtraStatus.Diamond:
      return <DiamondIcon {...props} />;
    default:
      return null;
  }
};
