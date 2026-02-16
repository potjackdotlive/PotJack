import { css } from "@emotion/react";
import { typographyStyles } from "styles/typography";

export const leaderboardListStyles = {
  root: css`
    width: 100%;
    position: relative;
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  `,

  loadMoreWrapper: css`
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 40px;
    background: linear-gradient(0deg, var(--color-item-background-card, #131313) 33.24%, rgba(24, 24, 27, 0) 100%);

    & button span {
      color: var(--color-primary-text-secondary-foreground, #c084fc);
      ${typographyStyles.bodyDefaultMd}
    }
  `,

  otherParticipants: css`
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow: auto;
  `,
};
