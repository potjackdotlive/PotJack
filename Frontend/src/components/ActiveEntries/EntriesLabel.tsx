import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "antd";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_ACTIVE_ENTRIES } from "translations";
import { activeEntriesStyles as styles } from "./activeEntriesStyles";

type Props = { amount: number };

export const EntriesLabel: FC<Props> = ({ amount }): ReactNode => {
  const { t } = useTranslation();

  return (
    <div css={styles.itemsContainer}>
      <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textNeutral]}>{t(TXT_ACTIVE_ENTRIES)}</Typography>
      <div css={styles.amountWrapper}>
        <Typography css={[typographyStyles.bodySmallMd, commonStyles.textNeutral]}>{amount}</Typography>
      </div>
    </div>
  );
};
