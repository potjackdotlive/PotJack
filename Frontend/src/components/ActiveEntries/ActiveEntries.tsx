import React, { CSSProperties, FC, ReactNode } from "react";
import { Collapse, Flex, Modal } from "antd";
import { css } from "@emotion/react";
import ChevronIcon from "icons/li_chevron-down.svg?react";
import { EntriesLabel } from "components/ActiveEntries/EntriesLabel";
import { EntryItem } from "components/ActiveEntries/EntryItem";
import { EntryItemSmall } from "components/ActiveEntries/EntryItemSmall";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { usePlayerActiveEntries } from "hooks/usePlayerActiveEntries";
import { useToggle } from "hooks/useToggle";
import { activeEntriesStyles as styles } from "./activeEntriesStyles";

type Props = object;

export const ActiveEntries: FC<Props> = (): ReactNode => {
  const { handleClose, open, handleOpen } = useToggle();
  const { sm } = useMediaQueryMatches();

  const panelStyle: CSSProperties = {
    marginBottom: 24,
    background: "#1C1C1E",
    borderRadius: 20,
    margin: "0",
    border: "1px solid var(--color-neutral-border-neutral, #3F3F46)",
  };

  const activeEntries = usePlayerActiveEntries();

  const activeEntriesAmount = activeEntries?.length;

  if (!activeEntriesAmount) {
    return null;
  }

  return (
    <>
      <div style={{ width: "100%" }} onClick={handleOpen}>
        <Collapse
          bordered={false}
          {...(!sm && { collapsible: "disabled" })}
          expandIconPosition="end"
          css={styles.collapse}
          expandIcon={() => <ChevronIcon />}
          items={[
            {
              key: "1",
              label: <EntriesLabel amount={activeEntriesAmount} />,
              children: (
                <Flex vertical gap={8}>
                  {activeEntries.map((ae) => (
                    <EntryItem key={ae.coin} {...ae} />
                  ))}
                </Flex>
              ),
              style: panelStyle,
            },
          ]}
        />
      </div>

      <Modal
        onCancel={handleClose}
        centered={false}
        title={<EntriesLabel amount={activeEntriesAmount} />}
        closable={{ "aria-label": "Custom Close Button" }}
        open={!sm && open}
        footer={null}
        width="100%"
        css={[
          css`
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
          `,
          css`
            & .ant-modal-content {
              border-top: 1px solid var(--color-neutral-border-neutral, #3f3f46);
              height: 100%;
              background: var(--color-neutral-background-neutral, #131313);
              padding: ${sm ? "16px 16px 24px 16px" : "16px 16px 24px 16px"};
            }
          `,
        ]}
        destroyOnHidden
      >
        <Flex vertical gap={8}>
          {activeEntries.map((ae) => (
            <EntryItemSmall key={ae.coin} handleClose={handleClose} {...ae} />
          ))}
        </Flex>
      </Modal>
    </>
  );
};
