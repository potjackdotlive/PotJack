import { css } from "@emotion/react";

export const routeButtonStyles = {
  button: css`
    width: 100%;
    border-radius: 12px;
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
    background: #212124;
    box-shadow: none;

    & svg {
      transition: color 0.2s;
      color: var(--color-neutral-border-neutral-light, #71717a);
    }

    &:hover,
    &:focus {
      & svg {
        color: var(--color-neutral-text-neutral-foreground, #fff);
      }

      background: var(--color-muted-background-muted, #27272a);
      box-shadow: none;
    }
  `,
  disabled: css`
    background: var(--color-muted-background-muted-secondary, #3f3f46);

    &:hover,
    &:focus {
      background: var(--color-muted-background-muted-secondary, #3f3f46);
    }
  `,
};
