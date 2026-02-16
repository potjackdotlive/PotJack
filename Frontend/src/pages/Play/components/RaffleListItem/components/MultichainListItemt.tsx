import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { css, SerializedStyles } from "@emotion/react";
import GlobeIcon from "icons/li_globe.svg?react";
import { raffleListItemStyles } from "pages/Play/components/RaffleListItem/raffleListItemStyles";
import { typographyStyles } from "styles/typography";
import { TXT_ALL_POOLS } from "translations";

const styles = {
  globeWrapper: css`
    height: 40px;
    width: 40px;
    background: #26262a;
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

type Props = {
  rootStyles?: SerializedStyles | SerializedStyles[];
  onClick?: () => void;
};

export const MultichainListItem: FC<Props> = ({ rootStyles, onClick }) => {
  const { t } = useTranslation();

  return (
    <Flex css={[raffleListItemStyles.root, rootStyles]} onClick={onClick} gap={8}>
      <div css={styles.globeWrapper}>
        <GlobeIcon width={20} height={20} />
      </div>

      <Typography css={typographyStyles.bodyDefaultMd}>{t(TXT_ALL_POOLS)}</Typography>
    </Flex>
  );
};
