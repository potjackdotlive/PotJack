import { css } from "@emotion/react";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";

export const leaderboardParticipantStyles = {
  root: css`
    position: relative;
    display: flex;
    width: 100%;
    padding: 10px 12px;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--radius-radius-md, 12px);
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);

    ${commonStyles.positionShadows}

    & > .ant-flex {
      width: 25%;
    }

    &:hover {
      background: var(--scale-white-white-alpha-five, rgba(255, 255, 255, 0.05));
    }
  `,
  rootMobile: css`
    position: relative;
    min-height: 120px;
    padding: 12px;
    gap: 20px;
    width: 100%;
    border-radius: 12px;
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);

    ${commonStyles.positionShadows}
  `,
  selfRoot: css`
    background: var(--color-primary-background-secondary-accent, rgba(168, 85, 247, 0.27));
    backdrop-filter: blur(7px);
  `,
  position: css`
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: var(--color-muted-background-muted-p50, rgba(39, 39, 42, 0.5));
    position: relative;
    color: var(--color-neutral-text-neutral-foreground, #fff);

    ${typographyStyles.bodyDefaultMd}
    ${commonStyles.positionIcons}
  `,
  desktopPosition: css`
    height: 44px;
    width: 44px;

    ${typographyStyles.bodyDefaultMd}
  `,
  mobilePosition: css`
    height: 32px;
    width: 32px;

    ${typographyStyles.bodySmallTidy}
  `,
  meIndicator: css`
    display: flex;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  `,
  selfPosition: css`
    background: var(--scale-white-white-alpha-ten, rgba(255, 255, 255, 0.1));
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
