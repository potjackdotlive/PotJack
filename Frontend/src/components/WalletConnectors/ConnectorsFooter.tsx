import * as React from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Flex, Typography } from "antd";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_PRESS_LEARN_MORE, TXT_SECURE_STORAGE_FOR_YOUR_CRYPTO } from "translations";

export const ConnectorsFooter: FC = () => {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={16} style={{ marginTop: 16 }}>
      <Divider />
      <Flex vertical gap={8} align="center" justify="center">
        <Typography css={typographyStyles.bodyDefaultMd}>{t(TXT_SECURE_STORAGE_FOR_YOUR_CRYPTO)}</Typography>
        <Typography css={[typographyStyles.bodySmallMd, commonStyles.textMuted, commonStyles.textAlignCenter]}>
          {t(TXT_PRESS_LEARN_MORE)}
        </Typography>
      </Flex>
    </Flex>
  );
};
