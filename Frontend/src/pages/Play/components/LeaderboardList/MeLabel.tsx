import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "antd";
import { css } from "@emotion/react";
import MeIcon from "icons/me-label-icon.svg?react";
import { typographyStyles } from "styles/typography";
import { TXT_ME } from "translations";

const styles = {
  root: css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  text: css`
    position: absolute;
    right: 6px;
  `,
};

type Props = object;

export const MeLabel: FC<Props> = () => {
  const { t } = useTranslation();

  return (
    <div css={styles.root}>
      <MeIcon />
      <Typography css={[typographyStyles.bodySmallSb, styles.text]}>{t(TXT_ME)}</Typography>
    </div>
  );
};
