import { css } from '@emotion/react';
import { Typography } from 'antd';
import RaffleBadgeWrapper from 'pages/Play/components/MainArea/components/RaffleBadgeWrapper';
import { TimerContext } from 'pages/Play/components/RaffleListItem/contexts/TimerContext/TimerContext';
import { typographyStyles } from 'styles/typography';

const styles = {
  root: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1 0 0;
    min-height: 34px;
    padding: 0 12px;
    gap: 8px;
    border-radius: 16px;
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
  `,
  timer: css`
    color: var(--color-neutral-text-neutral-foreground, #fff);
  `,
};

export const OpenToParticipate = () => {
  return (
    <div css={styles.root}>
      <RaffleBadgeWrapper />
      <Typography css={[typographyStyles.bodySmallSb, styles.timer]}>
        <TimerContext />
      </Typography>
    </div>
  );
};
