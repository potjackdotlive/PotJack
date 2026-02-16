import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import OctagonIcon from "icons/li_x-octagon.svg?react";
import { Button } from "components/Button/Button";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_NOTHING_FOUND, TXT_RESET_FILTERS, TXT_THERE_ARE_NO_ROUNDS_MATCHING } from "translations";

const styles = {
  root: css`
    display: flex;
    width: 100%;
    padding: 24px 12px;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--radius-radius-md, 12px);
    text-align: center;
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
  `,
  icon: css`
    color: var(--color-alert-icon-alert-foreground, #eab308);
  `,
};

type Props = {
  resetFilters: () => void;
};

export const NothingFound: FC<Props> = ({ resetFilters }) => {
  const { t } = useTranslation();
  const { sm } = useMediaQueryMatches();

  return (
    <Flex css={styles.root} gap={12} vertical>
      <OctagonIcon css={styles.icon} />
      <Flex vertical gap={4}>
        <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textAlert]}>{t(TXT_NOTHING_FOUND)}</Typography>
        <Typography css={[typographyStyles.bodyLargeRg, commonStyles.textMuted]}>
          {t(TXT_THERE_ARE_NO_ROUNDS_MATCHING)}
        </Typography>
      </Flex>

      <Button onClick={resetFilters} size="lg" transparent css={!sm && commonStyles.fullWidth}>
        <Typography css={[typographyStyles.bodyDefaultMd]}>{t(TXT_RESET_FILTERS)}</Typography>
      </Button>
    </Flex>
  );
};
