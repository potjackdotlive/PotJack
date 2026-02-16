import { css } from "@emotion/react";

export const playStyles = {
  root: css`
    display: flex;
    gap: 16px;
  `,
  sideBar: css`
    width: 320px;
    overflow-y: auto;
    max-height: 100vh;
  `,
  centerWrapper: css`
    flex-wrap: wrap;
    width: 100%;
    overflow-x: clip;
    overflow-y: clip;
    flex-basis: auto;
    height: 100%;
    gap: 8px;
  `,
  multichainItem: css`
    justify-content: flex-start;
  `,
  multichainItemActive: css`
    border: 1px solid var(--color-neutral-border-neutral-light, #71717a);
    background: var(--color-muted-background-muted, #27272a);
  `,
};
