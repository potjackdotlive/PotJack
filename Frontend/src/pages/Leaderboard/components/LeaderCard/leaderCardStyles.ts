import { css } from "@emotion/react";

export const leaderCardStyles = {
  root: css`
    height: 236px;
    flex-shrink: 0;
    overflow: clip;
    border-radius: 26px;
    border: 1px solid transparent;

    &.first {
      color: var(--yellow-400, #facc15);
      background:
        linear-gradient(#131313, #131313) padding-box,
        linear-gradient(to bottom, #facc1580, #facc1514) border-box;
    }

    &.second {
      color: var(--color-neutral-text-neutral-foreground, #fff);
      background:
        linear-gradient(#131313, #131313) padding-box,
        linear-gradient(to bottom, #ffffff80, #ffffff14) border-box;
    }

    &.third {
      color: var(--fuchsia-400, #e879f9);
      background:
        linear-gradient(#131313, #131313) padding-box,
        linear-gradient(to bottom, #e879f980, #e879f914) border-box;
    }
  `,
  avatarWrapper: css`
    position: absolute;
    top: 33px;
    left: 5px;
    z-index: 2;
    aspect-ratio: 1;
    clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
    overflow: hidden;
    transform: rotate(30deg);

    span {
      transform: rotate(-30deg);
    }
  `,
};
