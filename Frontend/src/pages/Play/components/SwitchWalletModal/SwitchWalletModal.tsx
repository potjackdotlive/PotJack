import React, { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Divider, Flex, Modal, Typography } from "antd";
import { useConnect as usePhantomSdkConnect } from "@phantom/react-sdk";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { connect } from "@wagmi/core";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import BadgeInfoIcon from "icons/li_badge-info.svg?react";
import { useConnectors } from "wagmi";
import { Alert } from "components/Alert/Alert";
import { warningNotification } from "components/Notification/Notification";
import { ConnectorView } from "components/WalletConnectors/components/ConnectorView/ConnectorView";
import { useDisconnect } from "components/WalletConnectors/hooks/useDisconnect";
import { SupportedConnector } from "components/WalletConnectors/types";
import { wagmiConfig } from "config/wagmiConfig";
import { useIsMobile } from "hooks/useIsMobile";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import {
  TXT_CANNOT_CONNECT_WALLET,
  TXT_SWITCH_WALLET_TO_CONTINUE,
  TXT_TO_PARTICIPATE_IN_THIS_ENTRY,
  TXT_WALLET_DOESNT_SUPPORT,
  TXT_WALLET_PROVIDER_NOT_PRESENT,
} from "translations";
import { SUPPORTED_ETH_CHAINS } from "utils/constants/chainsConstants";
import { getChainFullName } from "utils/getChainFullName";
import { styles } from "./styles";

type Props = {
  open: boolean;
  callback: () => void;
  handleCancel: () => void;
};

export const SwitchWalletModal: FC<Props> = ({ open, callback, handleCancel }) => {
  const { t } = useTranslation();
  const { xs } = useBreakpoint();
  const { connect: phantomConnect } = usePhantomSdkConnect();
  const { networkId } = usePlayContext();
  const wagmiConnectors = useConnectors();
  const disconnect = useDisconnect();
  const solanaWallet = useSolanaWallet();
  const isMobile = useIsMobile();

  const allowedConnectors = SUPPORTED_ETH_CHAINS.includes(networkId as number)
    ? wagmiConnectors
        .filter((connector) =>
          [SupportedConnector.WalletConnect, SupportedConnector.MetaMask].includes(
            connector.name as SupportedConnector,
          ),
        )
        .map((connector) => ({
          name: connector.name,
          connect: async () => {
            await disconnect();
            await connect(wagmiConfig, { connector });
            callback();
          },
        }))
    : [
        {
          name: "Phantom",
          connect: async () => {
            const phantom = solanaWallet?.wallets.find((w) => w.adapter.name === SupportedConnector.Phantom);

            await disconnect();
            if (isMobile) {
              phantomConnect({ provider: "deeplink" }).catch((e) => {
                warningNotification({
                  message: t(TXT_CANNOT_CONNECT_WALLET),
                  description: t(TXT_WALLET_PROVIDER_NOT_PRESENT),
                  duration: 5,
                });
              });
              return;
            }
            if (phantom) {
              solanaWallet.select(phantom.adapter.name);
              solanaWallet.connect().then(callback).catch(console.error);
            } else {
              warningNotification({
                message: t(TXT_CANNOT_CONNECT_WALLET),
                description: t(TXT_WALLET_PROVIDER_NOT_PRESENT),
                duration: 5,
              });
            }
          },
        },
      ];

  return (
    <>
      <Modal
        centered
        title={<Typography css={styles.header}>{t(TXT_SWITCH_WALLET_TO_CONTINUE)}</Typography>}
        closable={{ "aria-label": "Close Button" }}
        open={open}
        onCancel={handleCancel}
        css={[styles.root, ...(xs ? [styles.rootXs] : [])]}
        destroyOnHidden
        footer={null}
      >
        <Flex vertical gap={24}>
          <Alert
            filled
            type="warning"
            showIcon
            icon={<BadgeInfoIcon width={20} height={20} />}
            message={t(TXT_WALLET_DOESNT_SUPPORT)}
          />
          <Typography
            css={[
              styles.participateText,
              typographyStyles.bodySmallMd,
              commonStyles.textMuted,
              commonStyles.textAlignCenter,
            ]}
          >
            <Trans
              i18nKey={TXT_TO_PARTICIPATE_IN_THIS_ENTRY}
              values={{ chain: getChainFullName(networkId || "") }}
              components={{ bold: <strong /> }}
            />
          </Typography>
          <Divider />
          <Flex>
            <Flex
              style={{
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
              gap={8}
              css={commonStyles.fullWidth}
            >
              {allowedConnectors.map(({ name, connect }) => (
                <ConnectorView key={name} connector={name as SupportedConnector} connect={connect} />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};
