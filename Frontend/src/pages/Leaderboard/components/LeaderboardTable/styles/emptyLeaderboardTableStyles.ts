import { css } from "@emotion/react";

export const emptyLeaderboardTableStyles = {
  root: css`
    position: relative;
    padding: 0 24px;
    width: 100%;
    max-width: 950px;
    height: 318px;
    text-align: center;

    @media (min-width: 768px) {
      height: 526px;
      border-radius: 26px;
      background: var(--color-item-background-card, #131313);
    }
  `,
};
