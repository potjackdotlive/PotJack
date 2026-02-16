import { css } from "@emotion/react";
import { typographyStyles } from "styles/typography";

export const leaderboardTableStyles = {
  root: css`
    display: flex;
    width: 100%;
    max-width: 952px;
    padding: 16px;
    flex-direction: column;
    border-radius: 26px;
    gap: 16px;
    border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
    background: var(--color-item-background-card, #131313);

    & .ant-list .ant-list-item {
      padding: 0;
      margin-bottom: 8px;
    }
  `,
  paginationWrapper: css`
    position: relative;
  `,
  pagination: css`
    && .ant-pagination-next,
    && .ant-pagination-prev,
    && .ant-pagination-next,
    && .ant-pagination-item,
    && .ant-pagination-jump-prev,
    && .ant-pagination-jump-next {
      height: 40px;
      min-width: 40px;

      &:hover {
        background: var(--color-muted-background-muted, #27272a);
      }
    }

    && .ant-pagination-prev,
    && .ant-pagination-next {
      ${typographyStyles.bodyDefaultSb}
      color: var(--color-muted-text-muted-foreground, #a1a1aa);
      border-radius: 12px;
      padding: 0 12px;
      border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
      background: var(--color-neutral-background-neutral, #131313);

      /* Shadows/shadow-xs-skeuomorphic */
      box-shadow:
        0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset,
        0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset,
        0px 1px 2px 0px rgba(10, 13, 18, 0.05);
    }

    && .ant-pagination-prev {
      margin-right: auto;
    }

    && .ant-pagination-next {
      margin-left: auto;
    }

    && .ant-pagination-item {
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      padding: 8px;
      color: var(--color-muted-text-muted-foreground, #a1a1aa);

      ${typographyStyles.bodyDefaultMd}
      &:hover {
        background: var(--color-muted-background-muted, #27272a);
      }
    }

    && .ant-pagination-jump-prev,
    && .ant-pagination-jump-next {
      color: var(--color-muted-text-muted-foreground, #a1a1aa);
      padding: 10px 12px;
      border-radius: 12px;
      background: var(--color-neutral-background-neutral, #131313);

      /* Shadows/shadow-xs-skeuomorphic */
      box-shadow:
        0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset,
        0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset,
        0px 1px 2px 0px rgba(10, 13, 18, 0.05);

      ${typographyStyles.bodyDefaultSb}
      &:hover {
        background: var(--color-muted-background-muted, #27272a);
      }
    }

    && .ant-pagination-item-active {
      color: var(--color-neutral-text-neutral-foreground, #fff);
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--color-muted-background-muted, #27272a);
      border: transparent;
      ${typographyStyles.bodyDefaultMd}
    }

    && .ant-pagination-simple-pager {
      display: none;
    }
  `,
  simplePager: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  `,
  spin: css`
    padding: 16px 0;
  `,
  noResultsWrapper: css`
    padding: 40px 0;
    text-align: center;
  `,
};
