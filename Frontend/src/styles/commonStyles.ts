import { css } from "@emotion/react";

export const commonStyles = {
  fullWidth: css`
    width: 100%;
  `,
  fullHeight: css`
    height: 100%;
  `,
  textMuted: css`
    color: var(--color-muted-text-muted-foreground, #a1a1aa);
  `,
  textNeutral: css`
    color: var(--color-neutral-text-neutral-foreground, #fff);
  `,
  textAlert: css`
    color: var(--color-alert-text-alert-foreground, #eab308);
  `,
  textDanger: css`
    color: var(--color-destructive-background-destructive-accent, #ef4444);
  `,
  textAlignCenter: css`
    text-align: center;
  `,
  flexDirectionColumn: css`
    flex-direction: column;
  `,
  radius16: css`
    border-radius: var(--radius-radius-lg, 16px);
  `,
  cursorPointer: css`
    cursor: pointer;
  `,
  columnReverse: css`
    flex-direction: column-reverse;
  `,
  flexRow: css`
    flex-direction: row;
  `,
  flexAlignEnd: css`
    align-self: flex-end;
  `,
  leader: css`
    color: var(--yellow-400, #facc15);
  `,
  whale: css`
    color: var(--fuchsia-400, #e879f9);
  `,
  diamond: css`
    color: var(--sky-400, #38bdf8);
  `,
  positionShadows: css`
    &.first {
      box-shadow: 0 2px 20px 2px rgba(179, 0, 0, 0.28) inset;
    }

    &.second {
      box-shadow: 0 2px 20px 2px rgba(179, 0, 134, 0.3) inset;
    }

    &.third {
      box-shadow: 0 2px 20px 2px rgba(0, 116, 179, 0.22) inset;
    }

    &.fourth {
      box-shadow: 0 2px 20px 2px rgba(179, 105, 0, 0.25) inset;
    }

    &.fifth {
      box-shadow: 0 2px 20px 2px rgba(255, 255, 255, 0.12) inset;
    }
  `,
  positionIcons: css`
    &.first {
      box-shadow: 0px 2px 20px 2px rgba(179, 0, 0, 0.28) inset;

      &:after {
        position: absolute;
        content: "";
        width: 20px;
        height: 20px;
        bottom: -6px;
        background-image: url("positionBadges/champion.png");
      }
    }

    &.second {
      box-shadow: 0px 2px 20px 2px rgba(179, 0, 134, 0.3) inset;

      &:after {
        position: absolute;
        content: "";
        width: 20px;
        height: 20px;
        bottom: -6px;
        background-image: url("positionBadges/diamond.png");
      }
    }

    &.third {
      box-shadow: 0px 2px 20px 2px rgba(0, 116, 179, 0.22) inset;

      &:after {
        position: absolute;
        content: "";
        width: 20px;
        height: 20px;
        bottom: -6px;
        background-image: url("positionBadges/platinum.png");
      }
    }

    ,
    &.fourth {
      box-shadow: 0px 2px 20px 2px rgba(179, 105, 0, 0.25) inset;

      &:after {
        position: absolute;
        content: "";
        width: 20px;
        height: 20px;
        bottom: -6px;
        background-image: url("positionBadges/gold.png");
      }
    }

    &.fifth {
      box-shadow: 0px 2px 20px 2px rgba(255, 255, 255, 0.12) inset;

      &:after {
        position: absolute;
        content: "";
        width: 20px;
        height: 20px;
        bottom: -6px;
        background-image: url("positionBadges/silver.png");
      }
    }
  `,
};
