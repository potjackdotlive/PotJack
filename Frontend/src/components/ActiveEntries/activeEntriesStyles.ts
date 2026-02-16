import { css } from "@emotion/react";

export const activeEntriesStyles = {
  collapse: css`
    width: 100%;

    & .ant-collapse-expand-icon {
      color: #a1a1aa;
    }

    & .ant-collapse-item-active .ant-collapse-expand-icon {
      transition: transform 0.2s;
      transform: rotate(180deg);
    }
  `,
  amountWrapper: css`
    display: flex;
    min-width: 28px;
    height: 28px;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 16px;
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
  `,
  itemsContainer: css`
    display: flex;
    gap: 8px;
    align-items: center;
  `,
};
