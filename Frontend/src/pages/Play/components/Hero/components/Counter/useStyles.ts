import { css } from "@emotion/react";

export const useStyles = () => ({
  text: css`
    & .ant-statistic-content-value {
      color: var(--color-neutral-text-neutral-foreground, #fff);
      text-align: center;

      /* priceHero */
      font-family: "Geist Mono Variable", sans-serif;
      font-size: 60px;
      font-style: normal;
      font-weight: 600;
      line-height: 64px; /* 106.667% */
      letter-spacing: -0.48px;
    }
  `,
});
