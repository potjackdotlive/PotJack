import { css } from "@emotion/react";

export const selectNetworkModalStyles = {
  modal: css`
    & .ant-modal-title {
      background: var(--color-neutral-background-neutral, #131313);
      margin-bottom: 8px;
    }

    &.ant-modal {
      max-width: 322px;
      padding: 0;
      margin: 0;
      bottom: 0;

      & .ant-modal-close,
      & .ant-modal-close:hover {
        color: var(--color-primary-text-secondary-foreground, #c084fc);
      }

      & .ant-modal-close:focus-visible {
        outline: none;
      }
    }

    &.ant-modal > *:first-of-type {
      outline: none;
    }

    & .ant-modal-content {
      border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
      background: var(--color-neutral-background-neutral, #131313);
      padding: 16px 24px 24px 24px;
    }
  `,
  modalBottom: css`
    & .ant-modal-title {
      background: var(--color-neutral-background-neutral, #131313);
      margin-bottom: 8px;
    }

    &.ant-modal {
      min-width: 100%;
      padding: 0;
      margin: 0;
      bottom: 0;
      position: fixed;

      & .ant-modal-close,
      & .ant-modal-close:hover {
        color: var(--color-primary-text-secondary-foreground, #c084fc);
      }

      & .ant-modal-close:focus-visible {
        outline: none;
      }
    }

    &.ant-modal > *:first-of-type {
      outline: none;
      position: absolute;
      bottom: 0;
      width: 100%;
      border-radius: 32px 32px 0px 0px;
    }

    & .ant-modal-content {
      border-top: 1px solid var(--color-neutral-border-neutral, #3f3f46);
      height: 100%;
      background: var(--color-neutral-background-neutral, #131313);
      padding: 16px 16px 24px 16px;
    }
  `,
  modalContentWrapper: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    align-self: stretch;
  `,
};
