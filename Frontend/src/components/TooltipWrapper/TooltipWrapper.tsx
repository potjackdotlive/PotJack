import { FC, PropsWithChildren } from "react";
import { css } from "@emotion/react";

export const TooltipWrapper: FC<PropsWithChildren> = ({ children }) => (
  <div
    css={css`
      display: flex;
      padding: 12px 16px;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      border-radius: 12px;
      border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
      background: var(--color-neutral-background-neutral, #131313);
      box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.45);
    `}
  >
    {children}
  </div>
);
