import { FC } from "react";
import { Flex } from "antd";
import { css } from "@emotion/react";
import { format } from "date-fns";
import TimerIcon from "icons/li_timer-reset.svg?react";
import { typographyStyles } from "styles/typography";

type Props = {
  date: Date;
  showClock?: boolean;
};

export const Timer: FC<Props> = ({ date, showClock = true, ...props }) => (
  <Flex
    gap={6}
    align="center"
    css={css`
      ${typographyStyles.bodyDefaultMd}
    `}
    {...props}
  >
    {showClock && <TimerIcon />}
    {format(date, "HH:mm:ss")}
  </Flex>
);
