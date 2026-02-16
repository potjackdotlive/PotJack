import React, { FC } from "react";
import { matchPath } from "react-router-dom";
import { Flex, Modal } from "antd";
import { css } from "@emotion/react";
import MenuIcon from "icons/li_menu.svg?react";
import Logo from "icons/logo.svg?react";
import { IconButton } from "components/IconButton/IconButton";
import { RouteButton } from "components/RouteButton/RouteButton";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { useToggle } from "hooks/useToggle";
import { NavItem } from "pages/Play/components/Hero/components/Nav/utils";
import { commonStyles } from "styles/commonStyles";

const styles = {
  modal: css`
    & .ant-modal-title {
      background: var(--color-neutral-background-neutral, #131313);
      margin-bottom: 24px;
    }

    &.ant-modal {
      min-width: 100%;
      padding: 0;
      margin: 0;
      bottom: 0;
      position: fixed;

      & .ant-modal-close,
      & .ant-modal-close:hover {
        color: var(--color-primary-text-secondary-foreground, #c084fc);
      }

      & .ant-modal-close:focus-visible {
        outline: none;
      }
    }

    &.ant-modal > *:first-of-type {
      outline: none;
      position: absolute;
      bottom: 0;
      width: 100%;
      border-radius: 32px 32px 0px 0px;
    }

    & .ant-modal-content {
      border-top: 1px solid var(--color-neutral-border-neutral, #3f3f46);
      height: 100%;
      background: var(--color-neutral-background-neutral, #131313);
      padding: 16px 24px 24px 24px;
    }
  `,
  contentWrapper: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    align-self: stretch;
  `,
};

type Props = {
  navItems: NavItem[];
};

export const NavModal: FC<Props> = ({ navItems }) => {
  const { sm } = useMediaQueryMatches();
  const isMobile = !sm;

  const { open, toggleOpen } = useToggle();

  return (
    <>
      <IconButton outline onClick={toggleOpen} style={{ height: 36, width: 36 }}>
        <MenuIcon />
      </IconButton>
      <Modal
        onCancel={toggleOpen}
        centered={false}
        title={<Logo />}
        closable={{ "aria-label": "Custom Close Button" }}
        open={open}
        footer={null}
        width="100%"
        css={styles.modal}
        destroyOnHidden
      >
        <div css={styles.contentWrapper}>
          <Flex
            vertical
            gap={12}
            css={[
              commonStyles.fullWidth,
              css`
                ${isMobile ? "padding: 16px" : "padding: 16px 16px 8px 16px;"}
              `,
            ]}
          >
            {navItems.map((navItem) => {
              const isActive = matchPath({ path: navItem.route }, location.pathname);

              return <RouteButton key={navItem.title} onClick={toggleOpen} disabled={!!isActive} {...navItem} />;
            })}
          </Flex>
        </div>
      </Modal>
    </>
  );
};
