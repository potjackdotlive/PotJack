import { css } from "@emotion/react";
import { typographyStyles } from "styles/typography";

export const historyRecordStyles = {
  root: css`
    display: flex;
    width: 100%;
    padding: 10px 12px;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--radius-radius-md, 12px);
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);

    &.evenChildren > .ant-flex {
      width: 12.5%;
    }

    &:hover {
      background: var(--scale-white-white-alpha-five, rgba(255, 255, 255, 0.05));
    }
  `,
  position: css`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    color: var(--color-muted-text-muted-foreground, #a1a1aa);

    ${typographyStyles.bodyDefaultMd}
    color &.first {
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
  address: css`
    color: var(--color-neutral-text-neutral-foreground, #fff);
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
