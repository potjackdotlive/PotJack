import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import { css } from "@emotion/react";
import InfoTitle from "pages/Play/components/InfoTitle";
import { CoinSelector } from "pages/Play/components/MainArea/components/CoinSelector";
import { commonStyles } from "styles/commonStyles";
import { TXT_ENTRIES, TXT_ENTRIES_INFO } from "translations";

const styles = {
  root: css`
    display: flex;
    padding: 12px;
    gap: 16px;
    justify-content: space-between;
    align-self: stretch;
    align-items: center;
    border-radius: 12px;
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
    background: var(--color-muted-background-muted-p50, rgba(39, 39, 42, 0.5));
  `,
};

export const Entries = () => {
  const { t } = useTranslation();

  return (
    <Flex gap={16} css={[commonStyles.fullWidth, styles.root]}>
      <InfoTitle main={t(TXT_ENTRIES)} info={t(TXT_ENTRIES_INFO)} />
      <CoinSelector />
    </Flex>
  );
};
