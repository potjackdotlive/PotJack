import { css } from '@emotion/react';
import { Flex, Typography } from 'antd';
import { TimerContext } from 'pages/Play/components/RaffleListItem/contexts/TimerContext/TimerContext';
import { FC } from 'react';
import { commonStyles } from 'styles/commonStyles';
import { typographyStyles } from 'styles/typography';
import TimerIcon from 'icons/li_timer-reset.svg?react';

const Timer: FC = () => {
  return <Flex
    gap={6}
    align="center"
    css={[
      typographyStyles.bodyDefaultMd,
      commonStyles.textMuted,
      css`
        flex: 1;
        min-width: fit-content;
      `,
    ]}
  >
    <TimerIcon />
    <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>
      <TimerContext />
    </Typography>
  </Flex>
};

export default Timer;
