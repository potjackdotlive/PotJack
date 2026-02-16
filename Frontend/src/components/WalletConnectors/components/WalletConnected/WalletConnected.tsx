import * as React from "react";
import { FC } from "react";
import { Popover } from "antd";
import { useWalletUi } from "@wallet-ui/react";
import ChevronIcon from "icons/li_chevron-down.svg?react";
import { useConnection } from "wagmi";
import { Button, ButtonProps } from "components/Button/Button";
import { Profile } from "components/WalletConnectors/components/Profile/Profile";
import {
  connectorButtonStyles as buttonStyles,
  connectorButtonStyles,
} from "components/WalletConnectors/connectorStyles";
import { useToggle } from "hooks/useToggle";
import { commonStyles } from "styles/commonStyles";
import { addressFormatter } from "utils/formatters/addressFormatter";

type Props = ButtonProps & {
  fullWidth?: boolean;
};

export const WalletConnected: FC<Props> = ({ variant = "brand", transparent = true, fullWidth, ...buttonProps }) => {
  const { open, handleOpen, handleClose } = useToggle();
  const connection = useConnection();
  const solanaWalletUi = useWalletUi();

  const address = connection?.address || solanaWalletUi?.account?.address;

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      handleOpen();
    } else {
      handleClose();
    }
  };

  return (
    <Popover
      styles={{
        body: {
          border: "1px solid var(--color-neutral-border-neutral, #3F3F46)",
          padding: 16,
          borderRadius: 12,
          background: "#1c1c1e",
        },
      }}
      content={<Profile address={address as string} />}
      title={() => null}
      trigger="click"
      open={open}
      arrow={false}
      placement="bottomRight"
      onOpenChange={handleOpenChange}
    >
      <Button
        css={[buttonStyles.root, ...(fullWidth ? [commonStyles.fullWidth] : [])]}
        ghost
        onClick={(e) => {
          e.preventDefault();
        }}
        icon={<ChevronIcon css={[connectorButtonStyles.chevronIcon, open && connectorButtonStyles.chevronIconOpen]} />}
        iconPosition="end"
        {...buttonProps}
      >
        {addressFormatter(address || "")}
      </Button>
    </Popover>
  );
};
