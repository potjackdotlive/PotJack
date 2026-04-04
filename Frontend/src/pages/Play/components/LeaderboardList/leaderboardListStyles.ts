import { css } from "@emotion/react";
import { appScrollbar } from "styles/scrollbarStyles";
import { typographyStyles } from "styles/typography";

export const leaderboardListStyles = {
  root: css`
    flex: 1 1 0;
    min-height: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,

  scrollSection: css`
    flex: 1 1 0;
    min-height: 0;
    overflow: auto;
    ${appScrollbar}
  `,

  loadMoreWrapper: css`
    flex-shrink: 0;
    width: 100%;
    padding-top: 8px;
    background: linear-gradient(0deg, var(--color-item-background-card, #131313) 33.24%, rgba(24, 24, 27, 0) 100%);

    & button span {
      color: var(--color-primary-text-secondary-foreground, #c084fc);
      ${typographyStyles.bodyDefaultMd}
    }
  `,

  otherParticipants: css`
    flex-shrink: 0;
  `,
};
