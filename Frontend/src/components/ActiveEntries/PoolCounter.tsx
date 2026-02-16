import { FC, ReactNode } from "react";
import { Flex, Typography } from "antd";
import MedalIcon from "icons/li_medal.svg?react";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { coinFormatter } from "utils/formatters/coinFormatter";

type Props = {
  pool: number;
};

export const PoolCounter: FC<Props> = ({ pool }): ReactNode => (
  <Flex gap={6} align="center" css={commonStyles.textMuted}>
    <MedalIcon width={16} height={16} />
    <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textNeutral]}>{coinFormatter(pool)}</Typography>
  </Flex>
);
