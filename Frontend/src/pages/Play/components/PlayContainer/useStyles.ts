import { css } from "@emotion/react";

export const useStyles = () => ({
  root: css`
    display: flex;
    flex-shrink: 0;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
    min-height: 0;
    border-radius: 26px;
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
    background: var(--color-item-background-card, #131313);
  `,
});
