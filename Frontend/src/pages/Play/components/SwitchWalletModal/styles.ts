import { css } from "@emotion/react";
import { typographyStyles } from "styles/typography";

export const styles = {
  root: css`
    &.ant-modal {
      border-radius: 26px;
      background: var(--color-muted-background-muted, #27272a);
      width: 100%;
      min-width: 424px;
    }

    & .ant-modal-content {
      min-width: 424px;
      padding: 8px 16px 16px;
      border-radius: 26px;
      background: var(--color-muted-background-muted, #27272a);
    }

    & .ant-modal-title {
      background: var(--color-muted-background-muted, #27272a);
    }

    & .ant-modal-close,
    & .ant-modal-close:hover {
      color: var(--color-primary-text-secondary-foreground, #c084fc);
      top: 8px;
      width: 36px;
      height: 36px;
    }

    & .ant-modal-close-x {
      width: 36px;
      height: 36px;
    }

    & .ant-modal-footer {
      margin: 0;
    }
  `,
  rootXs: css`
    &.ant-modal {
      margin: 0;
      border: 0;
      top: 0;
      right: 0;
      padding-bottom: 0;
      max-width: 100%;
    }

    & .ant-modal-content {
      width: 100%;
      height: 100%;
      border-radius: 0;
      min-width: 100%;
      margin: 0;
    }
  `,
  header: css`
    color: var(--color-neutral-text-neutral-foreground, #fff);
    ${typographyStyles.bodyLargeMd};
    margin-bottom: 16px;
    padding: 6px 0;
  `,
  detailsWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: var(--color-neutral-text-neutral-foreground, #fff);
    padding: 12px 16px;
    border-radius: 26px;
    margin: 0 0 8px 0;
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
    background: var(--color-item-background-card, #131313);
  `,
  textGray: css`
    color: var(--color-muted-text-muted-foreground, #a1a1aa);
    ${typographyStyles.bodyDefaultRg}
  `,
  textWhite: css`
    color: var(--color-neutral-text-neutral-foreground, #fff);
    ${typographyStyles.bodyDefaultMd}
  `,
  divider: css`
    &.ant-divider {
      margin-top: 16px;
      margin-bottom: 16px;
    }
  `,
  buyTicketWrapper: css`
    flex-direction: column;
    align-items: center;
    gap: 8px;
  `,
  buyTicketCall: css`
    color: var(--color-alert-text-alert-foreground, #eab308);
  `,
  buyTicketCallIcon: css`
    width: 16px;
    height: 16px;

    & path {
      fill: var(--color-alert-text-alert-foreground, #eab308);
    }
  `,
  slippage: css`
    border-radius: 24px;
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
    padding: 12px 16px;
    width: 100%;
  `,
  iconMuted: css`
    fill: var(--color-muted-icon-muted-foreground, #71717a);
  `,
  ticketPrice: css`
    border-top: 1px solid var(--color-neutral-border-neutral, #3f3f46);
    padding-top: 12px;
  `,
  participateText: css`
    & strong {
      color: var(--color-neutral-text-neutral-foreground, #fff);
    }
  `,
};
