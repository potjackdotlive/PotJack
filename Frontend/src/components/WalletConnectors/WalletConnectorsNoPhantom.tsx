import * as React from "react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Modal, Typography } from "antd";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { useWalletUi } from "@wallet-ui/react";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { useConnection } from "wagmi";
import { Button, ButtonProps } from "components/Button/Button";
import { ConnectorView } from "components/WalletConnectors/components/ConnectorView/ConnectorView";
import { WalletConnected } from "components/WalletConnectors/components/WalletConnected/WalletConnected";
import { ConnectorsFooter } from "components/WalletConnectors/ConnectorsFooter";
import { useConnectorsNoPhantom } from "components/WalletConnectors/hooks/useConnectorsNoPhantom";
import { SupportedConnector } from "components/WalletConnectors/types";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_CONNECT_WALLET, TXT_CONNECTING } from "translations";
import { connectorButtonStyles as buttonStyles, connectorStyles as styles } from "./connectorStyles";

type Props = ButtonProps & {
  fullWidth?: boolean;
};

export const WalletConnectorsNoPhantom: FC<Props> = ({
  variant = "brand",
  transparent = true,
  fullWidth,
  ...buttonProps
}) => {
  const { t } = useTranslation();
  const { xs, lg } = useBreakpoint();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wagmiConnection = useConnection();
  const solanaWallet = useSolanaWallet();

  const solanaWalletUi = useWalletUi();

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const allowedConnectors = useConnectorsNoPhantom(hideModal);

  const isConnecting = wagmiConnection?.isConnecting || solanaWallet?.connecting;

  const titleText = t(TXT_CONNECT_WALLET);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (wagmiConnection?.isConnected || solanaWalletUi?.connected) {
    return <WalletConnected variant={variant} transparent={transparent} fullWidth={fullWidth} {...buttonProps} />;
  }

  return (
    <>
      <Button
        onClick={showModal}
        css={[buttonStyles.root, ...(fullWidth ? [commonStyles.fullWidth] : [])]}
        variant={variant}
        transparent={transparent}
        {...buttonProps}
      >
        <Typography css={[typographyStyles.bodyDefaultMd]}>
          {isConnecting ? t(TXT_CONNECTING) : t(TXT_CONNECT_WALLET)}
        </Typography>
      </Button>
      <Modal
        centered
        title={<Typography css={styles.header}>{titleText}</Typography>}
        closable={{ "aria-label": "Close Button" }}
        open={isModalOpen}
        onOk={hideModal}
        onCancel={handleCancel}
        css={[styles.root, ...(xs ? [styles.rootXs] : [])]}
        destroyOnHidden
        footer={<ConnectorsFooter />}
      >
        <Flex gap={8}>
          {allowedConnectors.map(({ name, connect }) => (
            <ConnectorView key={name} connector={name as SupportedConnector} connect={connect} />
          ))}
        </Flex>
      </Modal>
    </>
  );
};
