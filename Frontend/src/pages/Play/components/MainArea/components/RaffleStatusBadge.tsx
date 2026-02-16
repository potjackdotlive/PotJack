import { css, SerializedStyles } from '@emotion/react';
import { Typography } from 'antd';
import { FC } from 'react';
import { typographyStyles } from 'styles/typography';

const styles = {
  root: css`
    display: flex;
    align-items: center;
    gap: 6px;
  `,
};

type Props = {
  text: string;
  icon: string;
  color: SerializedStyles;
}

const RaffleStatusBadge: FC<Props> = ({ icon, color, text }) => {
  return (
    <div css={styles.root}>
      <img src={icon} alt={text} />
      <Typography css={[typographyStyles.bodySmallSb, color]}>
        {text}
      </Typography>
    </div>
  );
};

export default RaffleStatusBadge;
