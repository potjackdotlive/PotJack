import { css } from "@emotion/react";
import { typographyStyles } from "styles/typography";

export const ticketCounterStyles = {
  root: css`
    justify-self: center;
    width: 100%;
  `,
  counterWrapper: css`
    padding: 12px;
    gap: 8px;
    border-radius: var(--radius-radius-md, 12px);
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
    background: var(--color-neutral-background-neutral, #131313);

    /* system/shadow-sm */
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  `,
  counterText: css`
    min-width: 56px;
  `,
  odds: css`
    ${typographyStyles.bodyLargeMd}
    &.risk-critical strong {
      color: var(--red-300, #fca5a5);
    }

    &.risk-high strong {
      color: var(--orange-300, #fdba74);
    }

    &.risk-medium strong {
      color: var(--yellow-300, #fde047);
    }

    &.risk-low strong {
      color: var(--green-300, #86efac);
    }

    & strong {
      ${typographyStyles.bodyLargeSb}
    }
  `,
};
