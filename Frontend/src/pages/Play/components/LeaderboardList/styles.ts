import { css } from "@emotion/react";
import { commonStyles } from "styles/commonStyles";

export const participantStyles = {
  root: css`
    display: flex;
    width: 100%;
    padding: 10px 12px;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--radius-radius-md, 12px);
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
    transition: opacity 0.3s ease;

    ${commonStyles.positionShadows}
    &:hover {
      background: var(--scale-white-white-alpha-five, rgba(255, 255, 255, 0.05));
    }
  `,
  winnerWrapper: css`
    position: relative;

    &:before {
      position: absolute;
      content: "";
      width: 29px;
      height: 27px;
      top: -5px;
      left: -7px;
      background-image: url("leader/leader-leaves-left-gold.png");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    &:after {
      position: absolute;
      content: "";
      width: 29px;
      height: 27px;
      top: -5px;
      right: -7px;
      background-image: url(leader/leader-leaves-right-gold.png);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  `,
  position: css`
    height: 44px;
    width: 44px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: var(--color-muted-background-muted-p50, rgba(39, 39, 42, 0.5));
    position: relative;

    ${commonStyles.positionIcons}
    &.winner {
      box-shadow: 0px 2px 20px 2px rgba(249, 241, 0, 0.28) inset;
    }
  `,
  address: css`
    color: var(--color-neutral-text-neutral-foreground, #fff);
  `,
  chain: css`
    color: var(--color-muted-text-muted-foreground, #a1a1aa);
  `,
  labelMuted: css`
    color: var(--color-muted-text-muted-foreground, #a1a1aa);
  `,
  labelWhite: css`
    color: var(--color-neutral-text-neutral-foreground, #fff);
  `,
};
