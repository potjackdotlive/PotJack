import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Divider, Flex, Modal, Typography } from "antd";
import { css, SerializedStyles } from "@emotion/react";
import ChevronIcon from "icons/li_chevron-down.svg?react";
import BlockchainSelector from "components/BlockchainSelector";
import Blockie from "components/Blockie/Blockie";
import { Button } from "components/Button/Button";
import { ProfileActions } from "components/WalletConnectors/components/Profile/ProfileActions";
import { profileModalStyles } from "components/WalletConnectors/components/Profile/profileModalStyles";
import { connectorButtonStyles } from "components/WalletConnectors/connectorStyles";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_ACCOUNT, TXT_YOUR_TOTAL_WINS } from "translations";
import { addressFormatter } from "utils/formatters/addressFormatter";

type Props = {
  buttonStyles: SerializedStyles[];
  address: string;
  isMobile: boolean;
  open: boolean;
  handleOpenToggle: () => void;
};

export const ProfileModal: FC<Props> = ({ buttonStyles, address, isMobile, open, handleOpenToggle }) => {
  const { t } = useTranslation();
  const totalWins = 5;
  const activeEntries = 5;

  return (
    <>
      <Button
        css={buttonStyles}
        ghost
        onClick={(e) => {
          e.preventDefault();
          handleOpenToggle();
        }}
        icon={<ChevronIcon css={[connectorButtonStyles.chevronIcon, open && connectorButtonStyles.chevronIconOpen]} />}
        iconPosition="end"
      >
        {addressFormatter(address || "")}
      </Button>
      <Modal
        onCancel={handleOpenToggle}
        centered={false}
        title={<Typography>{t(TXT_ACCOUNT)}</Typography>}
        closable={{ "aria-label": "Custom Close Button" }}
        open={open}
        footer={null}
        width="100%"
        css={profileModalStyles.modal}
        destroyOnHidden
      >
        <div css={profileModalStyles.modalContentWrapper}>
          <Flex
            vertical
            gap={12}
            css={[
              commonStyles.fullWidth,
              css`
                border-radius: 16px;
                background: var(--color-muted-background-muted-p50, rgba(39, 39, 42, 0.5));
              `,
              css`
                ${isMobile ? "padding: 16px" : "padding: 16px 16px 8px 16px;"}
              `,
            ]}
          >
            <Flex vertical gap={8} align="center">
              <Avatar src={<Blockie address={address} size={39} />} size={39} />
              <Typography css={typographyStyles.bodyDefaultMd}>{addressFormatter(address)}</Typography>
            </Flex>
            <Flex vertical gap={isMobile ? 16 : 8}>
              {isMobile ? <BlockchainSelector css={commonStyles.fullWidth} /> : <Divider />}

              <Flex>
                <Flex vertical flex={1} align="center">
                  <Typography css={typographyStyles.bodyLargeMd}>{totalWins}</Typography>
                  <Typography css={[typographyStyles.bodySmallSb, commonStyles.textMuted]}>
                    {t(TXT_YOUR_TOTAL_WINS)}
                  </Typography>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <ProfileActions />
        </div>
      </Modal>
    </>
  );
};
