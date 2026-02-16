import { css } from "@emotion/react";

export const notificationListStyles = {
  contentRoot: css`
    width: 100%;
    max-width: 424px;
    min-width: 320px;
    padding: 16px 8px;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 12px;
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
    background: var(--color-neutral-background-neutral, #131313);

    max-height: 300px;
    overflow-y: auto;

    /* shadow-tooltip */
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.45);
  `,
  title: css`
    width: 100%;
    padding: 0px 0px 16px 12px;
  `,
  groupTitle: css`
    padding: 12px 12px 6px 12px;
  `,
  spinContainer: css`
    width: 100%;
    justify-content: center;
    margin-top: 16px;
  `,
};
