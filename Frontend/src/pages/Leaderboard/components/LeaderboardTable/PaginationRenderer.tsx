import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import ArrowLeftIcon from "icons/li_arrow-left.svg?react";
import ArrowRightIcon from "icons/li_arrow-right.svg?react";
import { commonStyles } from "styles/commonStyles";
import { TXT_NEXT, TXT_PREVIOUS } from "translations";

const styles = {
  buttonText: css`
    color: var(--color-primary-text-primary-foreground, #fafafa);
  `,
};

export const PaginationRenderer = (
  page: number,
  type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
  element: ReactNode,
) => {
  const { t } = useTranslation();
  const { xs } = useBreakpoint();

  if (type === "page") {
    return <>{page}</>;
  }

  if (type === "prev") {
    return (
      <Flex gap={6} align="center" justify="center" css={[commonStyles.fullWidth, commonStyles.fullHeight]}>
        <ArrowLeftIcon />
        {!xs && <Typography.Text css={styles.buttonText}>{t(TXT_PREVIOUS)}</Typography.Text>}
      </Flex>
    );
  }

  if (type === "next") {
    return (
      <Flex gap={6} align="center" justify="center" css={[commonStyles.fullWidth, commonStyles.fullHeight]}>
        {!xs && <Typography.Text css={styles.buttonText}>{t(TXT_NEXT)}</Typography.Text>}
        <ArrowRightIcon />
      </Flex>
    );
  }

  return <>...</>;
};
