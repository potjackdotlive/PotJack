import { css } from "@emotion/react";
import { appScrollbar } from "styles/scrollbarStyles";

export const playStyles = {
  root: css`
    display: flex;
    align-items: stretch;
    gap: 16px;
  `,
  sideBar: css`
    width: 320px;
    flex: 0 0 320px;
    min-width: 0;
    min-height: 0;
    align-self: stretch;
    overflow: hidden;
  `,
  sideBarBody: css`
    flex: 1 1 0;
    min-height: 0;
    width: 100%;
    overflow-y: auto;
    ${appScrollbar}
  `,
  /** Column below header: fills row height; inner lists handle scroll + footer (e.g. Load more). */
  sideBarColumn: css`
    flex: 1 1 0;
    min-height: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,
  centerWrapper: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    min-height: 0;
    gap: 8px;
  `,
  multichainItem: css`
    justify-content: flex-start;
  `,
  multichainItemActive: css`
    border: 1px solid var(--color-neutral-border-neutral-light, #71717a);
    background: var(--color-muted-background-muted, #27272a);
  `,
};
