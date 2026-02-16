import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { LeaderExtraStatusIcon } from "components/LeaderExtraStatusIcon/LeaderExtraStatusIcon";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_DIAMOND_STREAK, TXT_LUCKY_LEADER, TXT_WHALE_WALLET } from "translations";
import { ParticipantExtraStatus } from "utils/types";

type Props = {
  status: ParticipantExtraStatus;
};

export const ExtraStatusText: FC<Props> = ({ status }) => {
  const { t } = useTranslation();

  switch (status) {
    case ParticipantExtraStatus.Whale:
      return (
        <Flex gap={8} align="center" css={commonStyles.whale}>
          <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.whale]}>{t(TXT_WHALE_WALLET)}</Typography>
          <LeaderExtraStatusIcon status={status} width={16} height={16} />
        </Flex>
      );
    case ParticipantExtraStatus.Leader:
      return (
        <Flex gap={8} align="center" css={commonStyles.leader}>
          <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.leader]}>{t(TXT_LUCKY_LEADER)}</Typography>
          <LeaderExtraStatusIcon status={status} width={16} height={16} />
        </Flex>
      );
    case ParticipantExtraStatus.Diamond:
      return (
        <Flex gap={8} align="center" css={commonStyles.diamond}>
          <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.diamond]}>{t(TXT_DIAMOND_STREAK)}</Typography>
          <LeaderExtraStatusIcon status={status} width={16} height={16} />
        </Flex>
      );
  }
};
