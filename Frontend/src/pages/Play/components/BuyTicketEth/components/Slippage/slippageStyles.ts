import { css } from '@emotion/react';

export const slippageStyles = {
  root: css`
    display: flex;
    flex: 1;
    align-items: flex-end;
    gap: 8px;
  `,
  button: css`
    min-width: 52px;
    height: 34px;
    border-radius: 10px;
    width: 100%;
    flex-shrink: unset;
  `,
  input: css`
    &:hover, &:focus, &:focus-visible {
      box-shadow:
        0px 0px 0px 1px #a1a1aa,
        0px 1px 2px 0px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
      background: var(--color-neutral-background-neutral, #131313);
    }
  `,
  inputError: css`
    &.ant-input {
      &, &:hover, &:focus {
        border: 1px solid var(--color-destructive-background-destructive-accent, #ef4444);
        box-shadow: none;
      }
    } `,
  error: css`
    margin-top: 4px;
  `
};
