import { css } from "@emotion/react";
import { typographyStyles } from "styles/typography";

export const raffleListItemStyles = {
  root: css`
    height: 60px;
    border: 1px solid transparent;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: var(--radius-radius-md);
    background: var(--color-muted-background-muted-p50, rgba(39, 39, 42, 0.5));
    cursor: pointer;
    will-change: transform;
    transform: translateZ(0);
    transition: all 0.2s;

    &:hover {
      border: 1px solid var(--color-neutral-border-neutral-light, #71717a);
    }

    &:active,
    &:focus {
      background: var(--color-muted-background-muted, #27272a);
    }
  `,
  active: css`
    border: 1px solid var(--color-neutral-border-neutral-light, #71717a);
    background: var(--color-muted-background-muted, #27272a);
  `,
  poolAmount: css`
    color: var(--color-neutral-text-neutral-foreground, #fff);
    ${typographyStyles.bodyDefaultTidy}
  `,
  raffleEndTime: css`
    color: var(--color-muted-text-muted-foreground, #a1a1aa);
    ${typographyStyles.bodyDefaultTidy}
  `,
};
