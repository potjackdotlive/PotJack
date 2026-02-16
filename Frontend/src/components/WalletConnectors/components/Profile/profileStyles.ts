import { css } from "@emotion/react";

export const profileStyles = {
  root: css`
    background: #1c1c1e;
    border: none;

    & .ant-card-body {
      padding: 0;
    }
  `,
  verticalDivider: css`
    height: auto;
    border-color: var(--color-neutral-border-neutral, #3f3f46);
  `,
};
