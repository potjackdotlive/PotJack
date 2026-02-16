import { css } from "@emotion/react";
import { typographyStyles } from "styles/typography";

export const chipButtonStyles = {
  root: css`
    cursor: pointer;
    display: flex;
    margin: 0;
    padding: 6px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 16px;
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
    background: transparent;

    &.active {
      border: 1px solid var(--color-neutral-border-neutral-light, #71717a);
      background: var(--color-muted-background-muted, #27272a);
    }

    &:hover {
      border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
      background: var(--color-muted-background-muted, #27272a);
    }
  `,
  size: {
    default: css`
      height: 32px;
      padding: 6px 12px;
    `,
    small: css`
      height: 28px;
      padding: 4px 8px;
    `,
  },
  pin: css`
    width: 8px;
    height: 8px;
    border-radius: 50%;
  `,
  text: css`
    color: var(--color-neutral-text-neutral-foreground, #fff);
    ${typographyStyles.bodyDefaultMd}
  `,
};
