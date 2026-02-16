import { css } from "@emotion/react";

export const styles = {
  root: css`
    display: flex;
    padding: 12px 20px;
    align-items: center;
    gap: 16px;
    border-radius: var(--radius-radius-lg, 10px);
    background: var(--color-item-background-card, #131313);

    & svg.ant-alert-icon {
      margin-inline-end: 0;
      color: inherit;
    }
  `,
  type: {
    destructive: css`
      color: var(--color-destructive-text-destructive-foreground, #dc2626);
      border: 1px solid var(--color-destructive-border-destructive, #dc2626);

      &.filled {
        border: 1px solid transparent;
        background: var(--color-destructive-background-destructive-secondary, rgba(220, 38, 38, 0.1));
      }
    `,
    warning: css`
      color: var(--color-alert-text-alert-foreground, #eab308);
      border: 1px solid var(--color-alert-border-alert, #ca8a04);

      &.filled {
        border: 1px solid transparent;
        background: var(--color-alert-background-alert-secondary, rgba(234, 179, 8, 0.1));
      }
    `,
  },
};
