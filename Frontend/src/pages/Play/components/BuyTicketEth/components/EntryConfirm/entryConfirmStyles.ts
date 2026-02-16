import { css } from "@emotion/react";
import { typographyStyles } from "styles/typography";

export const entryConfirmStyles = {
  raffleInfoContainer: css`
    margin: 0;
    border-radius: 16px;
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
    background: var(--color-item-background-card, #131313);
    padding: 16px;
    justify-content: space-between;
  `,
  tag: css`
    margin: 0;
    border: 1px solid transparent;
    border-radius: 8px;
    background: var(--color-muted-background-muted-secondary, #3f3f46);
    padding: 2px 8px;
    color: var(--color-muted-text-muted-foreground, #a1a1aa);
    ${typographyStyles.bodySmallMd}
  `,
};
