import { commonStyles } from "styles/commonStyles";
import { ParticipantExtraStatus } from "utils/types";

export const getExtraStatusClassName = (extraStatus?: ParticipantExtraStatus) => {
  switch (extraStatus) {
    case ParticipantExtraStatus.Whale:
      return commonStyles.whale;
    case ParticipantExtraStatus.Leader:
      return commonStyles.leader;
    case ParticipantExtraStatus.Diamond:
      return commonStyles.diamond;
    default:
      return commonStyles.textNeutral;
  }
};
