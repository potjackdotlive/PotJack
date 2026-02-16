import { css } from "@emotion/react";

export const selfParticipantStyles = {
  root: css`
    width: 100%;
    position: sticky;
    bottom: 8px;
    z-index: 1;
    border-radius: 13px;
    border: 1px solid rgba(192, 132, 252, 0.24);
    padding-top: 1px;

    background: var(--color-primary-background-secondary-accent, rgba(168, 85, 247, 0.27));
    box-shadow: 0 0 72px 10px rgba(192, 132, 252, 0.15);
    backdrop-filter: blur(156px);
  `,

  title: css`
    padding-left: 12px;
    color: var(--color-primary-text-secondary-foreground, #c084fc);
  `,

  content: css`
    position: relative;
    width: 100%;
    padding: 10px 12px;
    border-radius: var(--radius-radius-md, 12px);
    background: var(--color-primary-background-secondary-accent, rgba(168, 85, 247, 0.27));
    backdrop-filter: blur(7px);
  `,

  contentDesktop: css`
    & > .ant-flex {
      width: 25%;
    }
  `,
};
