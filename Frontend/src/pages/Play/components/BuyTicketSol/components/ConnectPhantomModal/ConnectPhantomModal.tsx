import React, { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Divider, Flex, Modal, Typography } from "antd";
import { css } from "@emotion/react";
import { useConnect as usePhantomSdkConnect } from "@phantom/react-sdk";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import BadgeInfoIcon from "icons/li_badge-info.svg?react";
import { Alert } from "components/Alert/Alert";
import { warningNotification } from "components/Notification/Notification";
import { ConnectorView } from "components/WalletConnectors/components/ConnectorView/ConnectorView";
import { useIsPhantomProviderPresent } from "components/WalletConnectors/hooks/useIsPhantomProviderPresent";
import { SupportedConnector } from "components/WalletConnectors/types";
import { useConnectPhantom } from "hooks/useConnectPhantom";
import { ticketStyles as styles } from "pages/Play/components/BuyTicketEth/ticketStyles";
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
import { getChainFullName } from "utils/getChainFullName";

type Props = {
  open: boolean;
  handleCancel: () => void;
};

const PhantomPresentView = ({ handleCancel }: Pick<Props, "handleCancel">) => (
  <ConnectorView connector={SupportedConnector.Phantom} connect={useConnectPhantom(handleCancel)} />
);

const PhantomMissingView = () => {
  const { t } = useTranslation();
  const { connect } = usePhantomSdkConnect();

  const connectPhantom = () => {
    connect({ provider: "deeplink" }).catch((e) => {
      warningNotification({
        message: t(TXT_CANNOT_CONNECT_WALLET),
        description: t(TXT_WALLET_PROVIDER_NOT_PRESENT),
        duration: 5,
      });
    });
  };

  return <ConnectorView connector={SupportedConnector.Phantom} connect={connectPhantom} />;
};

export const ConnectPhantomModal: FC<Props> = ({ open, handleCancel }) => {
  const { t } = useTranslation();
  const { xs } = useBreakpoint();
  const { networkId } = usePlayContext();

  const isPhantomPresent = useIsPhantomProviderPresent();

  return (
    <Modal
      centered
      title={
        <Typography
          css={css`
            color: var(--color-neutral-text-neutral-foreground, #fff);
            ${typographyStyles.bodyLargeMd};
            margin-bottom: 16px;
            padding: 6px 0;
          `}
        >
          {t(TXT_SWITCH_WALLET_TO_CONTINUE)}
        </Typography>
      }
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
            css`
              & strong {
                color: var(--color-neutral-text-neutral-foreground, #fff);
              }
            `,
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
            {isPhantomPresent ? <PhantomPresentView handleCancel={handleCancel} /> : <PhantomMissingView />}
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};
