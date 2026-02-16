import { css } from "@emotion/react";

export const searchStyles = {
  root: css``,
  input: css`
    min-width: 280px;
    max-width: 100%;

    && .ant-input {
      color: var(--color-neutral-text-neutral-foreground, #fff);
    }

    &.ant-input.ant-input-outlined:hover,
    &.ant-input.ant-input-outlined:focus,
    &.ant-input.ant-input-outlined:focus-within {
      box-shadow:
        0px 0px 0px 1px #a1a1aa,
        0px 1px 2px 0px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
      background: var(--color-neutral-background-neutral, #131313);
    }
  `,
  button: css`
    height: 36px;
  `,
  clear: css`
    display: inline-flex;
    cursor: pointer;
    color: #dc2626;
  `,
};
