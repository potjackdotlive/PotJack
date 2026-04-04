import { css } from "@emotion/react";

/**
 * Thin scrollbars aligned with dark UI (card / zinc borders, secondary purple on hover).
 * Apply to elements with overflow auto/scroll.
 */
export const appScrollbar = css`
  scrollbar-width: thin;
  scrollbar-color: var(--color-neutral-border-neutral, #3f3f46) transparent;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-neutral-border-neutral, #3f3f46);
    border-radius: 100px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary-text-secondary-foreground, #c084fc);
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
`;
