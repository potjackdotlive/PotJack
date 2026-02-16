import { css } from "@emotion/react";
import { typographyStyles } from "styles/typography";

export const styles = {
  blockchainSelect: css`
    width: 208px;
    height: 36px;

    & input {
      color: var(--color-muted-text-muted-foreground, #a1a1aa);

      &::placeholder {
        color: white;
      }
    }

    &.ant-select-open .ant-select-selection-item,
    & .ant-select-selection-item {
      color: var(--color-neutral-text-neutral-foreground, #fff);
      line-height: 20px !important;
      ${typographyStyles.bodyDefaultRg}
    }

    &.ant-select.ant-select-outlined.ant-select-focused div.ant-select-selector:not(.ant-pagination-size-changer) {
      box-shadow:
        0px 0px 0px 1px #a1a1aa,
        0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    }

    &.ant-select.ant-select-outlined .ant-select-selector {
      display: flex;
      height: 36px;
      padding: 4px 12px;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      background: var(--color-neutral-background-neutral, #131313);
      color: var(--color-neutral-text-neutral-foreground, #fff);
      border-radius: var(--radius-radius-md, 12px);
      border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
      background: var(--color-neutral-background-neutral, #131313);

      /* system/shadow-sm */
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
      ${typographyStyles.bodyDefaultRg}
    }

    &.ant-select.ant-select-outlined .ant-select-selector div.ant-select-prefix {
      color: var(--color-muted-text-muted-foreground, #a1a1aa);
      display: flex;
    }

    &.ant-select.ant-select-open span.ant-select-arrow {
      transform: rotate(180deg);
    }

    &.ant-select span.ant-select-arrow {
      transition: transform 0.3s ease;
      color: var(--color-muted-text-muted-foreground, #a1a1aa);
    }

    & .ant-select-selection-placeholder {
      color: var(--color-muted-text-muted-foreground, #a1a1aa);
      ${typographyStyles.bodyDefaultRg}
    }
  `,
};
