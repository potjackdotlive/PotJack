import { css } from "@emotion/react";
import { typographyStyles } from "styles/typography";

export const connectorStyles = {
  root: css`
    border-radius: 26px;
    background: var(--color-muted-background-muted, #27272a);
    width: 100%;
    max-width: 420px;

    & .ant-modal-content {
      padding: 16px;
      border-radius: 26px;
      background: var(--color-muted-background-muted, #27272a);
    }

    & .ant-modal-title {
      background: var(--color-muted-background-muted, #27272a);
    }

    & .ant-modal-close,
    & .ant-modal-close:hover {
      color: var(--color-primary-text-secondary-foreground, #c084fc);
    }

    & .ant-modal-footer {
      margin: 0;
    }
  `,
  rootXs: css`
    & .ant-modal-content {
      width: 100%;
      height: 100%;
      min-width: 100%;
      margin: 0;
    }
  `,
  header: css`
    color: var(--color-neutral-text-neutral-foreground, #fff);
    ${typographyStyles.bodyLargeMd}
  `,
};

export const connectorButtonStyles = {
  root: css`
    width: 134px;

    &.ant-dropdown-open .ant-btn-icon {
      transform: rotate(180deg);
    }

    & .ant-btn-icon {
      transition: transform 0.3s ease;
    }
  `,
  chevronIcon: css`
    transition: all 0.2s;
  `,
  chevronIconOpen: css`
    transform: rotate(180deg);
  `,
};
