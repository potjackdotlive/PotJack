import { css } from "@emotion/react";
import { typographyStyles } from "styles/typography";

export const hubDetailsStyles = {
  iconText: css`
    color: var(--color-muted-text-muted-foreground, #a1a1aa);
  `,
  divider: css`
    background: var(--color-neutral-border-neutral, #3f3f46);
    margin: 0;
  `,
  row: css`
    height: 40px;
  `,
  odds: css`
    text-align: center;
    color: var(--indicators-leaderboardpie-id-risk-medium, #fde047);
    ${typographyStyles.bodySmallMd};

    &.risk-critical {
      color: var(--indicators-leaderboardpie-id-risk-critical, #fca5a5);
    }

    &.risk-high {
      color: var(--indicators-leaderboardpie-id-risk-high, #fdba74);
    }

    &.risk-low {
      color: var(--indicators-leaderboardpie-id-risk-low, #86efac);
    }
  `,
};
