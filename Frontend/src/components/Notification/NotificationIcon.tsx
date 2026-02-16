import { FC } from "react";
import { css } from "@emotion/react";

export const NotificationIcon: FC = () => (
  <div
    css={css`
      background: inherit;
      min-height: 40px;
      height: 100%;
      width: 4px;
      border-radius: 4px;
    `}
  />
);
