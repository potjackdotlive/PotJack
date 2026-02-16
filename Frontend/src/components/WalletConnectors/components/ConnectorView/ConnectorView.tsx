import * as React from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import ArrowUpRightIcon from "icons/li_arrow-up-right.svg?react";
import PhantomIcon from "icons/Phantom.svg?react";
import MetaMaskIcon from "icons/wallet_metamask.svg?react";
import WalletConnectIcon from "icons/wallet_walletconnect.svg?react";
import { Button } from "components/Button/Button";
import { SupportedConnector } from "components/WalletConnectors/types";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_LEARN_MORE } from "translations";
import { Noop } from "utils/noop";

const styles = {
  root: css`
    padding: 12px;
    border-radius: 16px;
    background: var(--color-neutral-background-neutral, #131313);
    flex: 1;
    cursor: pointer;
    width: 100%;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
    }

    @media (max-width: 768px) {
      padding: 24px 12px;
    }
  `,
  learnMore: css`
    width: fit-content;
  `,
};

const CoinIconProvider: FC<{ connector: SupportedConnector }> = ({ connector }) => {
  const style = css`
    width: ${48}px;
    height: ${48}px;
  `;

  switch (connector) {
    case SupportedConnector.MetaMask:
      return <MetaMaskIcon css={style} />;
    case SupportedConnector.WalletConnect:
      return <WalletConnectIcon css={style} />;
    case SupportedConnector.Phantom:
      return <PhantomIcon css={style} />;
    default:
      return <></>;
  }
};

const getDocsUrl = (connector: SupportedConnector): string => {
  switch (connector) {
    case SupportedConnector.MetaMask:
      return "https://metamask.io/about";
    case SupportedConnector.WalletConnect:
      return "https://walletconnect.network/blog/introducing-the-walletconnect-foundation";
    case SupportedConnector.Phantom:
      return "https://phantom.com/";
    default:
      return "";
  }
};

export const ConnectorView: FC<{ connector: SupportedConnector; connect: Noop }> = ({ connector, connect }) => {
  const { lg } = useBreakpoint();
  const { t } = useTranslation();

  return (
    <Flex vertical gap={lg ? 12 : 16} css={commonStyles.fullWidth} onClick={connect} align="center" justify="center">
      <Flex vertical gap={8} css={styles.root} justify="center" align="center">
        <CoinIconProvider connector={connector} />
        <Typography css={typographyStyles.bodyDefaultMd} style={{ fontSize: lg ? 14 : 12 }}>
          {connector}
        </Typography>
      </Flex>
      <Link to={getDocsUrl(connector)} target="_blank" onClick={(e) => e.stopPropagation()}>
        <Button size="sm" ghost css={styles.learnMore} iconPosition="end" icon={<ArrowUpRightIcon />}>
          <Typography css={typographyStyles.bodySmallMd}>{t(TXT_LEARN_MORE)}</Typography>
        </Button>
      </Link>
    </Flex>
  );
};
