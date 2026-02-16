import { css } from "@emotion/react";
import { typographyStyles } from "styles/typography";

export const styles = {
  variant: {
    brand: css`
      color: var(--color-primary-text-primary-foreground, #fafafa);
      text-align: center;
      background: var(--color-primary-background-primary, #9333ea);
      box-shadow:
        0px 2px 16px 0px rgba(255, 255, 255, 0.3) inset,
        0px 2px 16px -2px rgba(233, 130, 254, 0.15),
        0px 4px 31px -1px rgba(233, 105, 255, 0.27);
      border: 1px solid transparent;

      &:hover {
        background: var(--color-primary-background-primary-accent, #9333ea);
        box-shadow:
          0px 2px 16px 0px rgba(255, 255, 255, 0.6) inset,
          0px 2px 16px -2px rgba(233, 130, 254, 0.15),
          0px 4px 31px -1px rgba(233, 105, 255, 0.27),
          0px 4px 31px -1px rgba(233, 105, 255, 0.27);
      }

      &:active {
        background: var(--color-primary-background-primary, #9333ea);
        box-shadow:
          0px 2px 16px 0px rgba(255, 255, 255, 0.6) inset,
          0px 2px 16px -2px rgba(233, 130, 254, 0.15),
          0px 4px 31px -1px rgba(233, 105, 255, 0.27),
          0px 4px 31px -1px rgba(233, 105, 255, 0.27);
      }

      &:disabled {
        opacity: 0.5;
        background: var(--color-primary-background-primary, #9333ea);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
      }

      &.transparent {
        color: var(--color-primary-text-secondary-foreground, #c084fc);
        background: var(--color-primary-background-secondary, rgba(168, 85, 247, 0.1));
        box-shadow: none;

        &:hover {
          background: var(--color-primary-background-secondary-accent, rgba(168, 85, 247, 0.27));
        }

        &:focus {
          background: var(--color-primary-background-secondary, rgba(168, 85, 247, 0.1));
        }

        &:disabled {
          opacity: 0.5;
          background: var(--color-primary-background-secondary, rgba(168, 85, 247, 0.1));
        }
      }

      &.ghost {
        color: var(--color-primary-text-secondary-foreground, #c084fc);
        background: transparent;
        box-shadow: none;

        &:hover {
          background: var(--color-primary-background-secondary, rgba(168, 85, 247, 0.1));
        }

        &:focus {
          background: var(--color-primary-background-secondary, rgba(168, 85, 247, 0.1));
        }

        &:disabled {
          opacity: 0.5;
        }
      }

      &.outline {
        border: 1px solid var(--color-primary-border-primary, #9333ea);
        color: var(--color-primary-text-secondary-foreground, #c084fc);
        background: var(--color-neutral-background-neutral, #131313);
        box-shadow: none;

        &:hover {
          background: var(--color-primary-background-secondary, rgba(168, 85, 247, 0.1));
        }

        &:focus {
          background: var(--color-primary-background-secondary, rgba(168, 85, 247, 0.1));
        }

        &:disabled {
          opacity: 0.5;
        }
      }
    `,
    destructive: css`
      color: var(--color-primary-text-primary-foreground, #fafafa);
      text-align: center;
      background: var(--color-destructive-background-destructive, #dc2626);
      box-shadow:
        0px 2px 16px 0px rgba(255, 255, 255, 0.3) inset,
        0px 2px 16px -2px rgba(220, 38, 38, 0.15),
        0px 4px 31px -1px rgba(220, 38, 38, 0.27);
      border: 1px solid transparent;

      &:hover {
        background: var(--color-destructive-background-destructive-accent, #ef4444);
        box-shadow:
          0px 2px 16px 0px rgba(255, 255, 255, 0.6) inset,
          0px 2px 16px -2px rgba(220, 38, 38, 0.15),
          0px 4px 31px -1px rgba(220, 38, 38, 0.27),
          0px 4px 31px -1px rgba(220, 38, 38, 0.27);
      }

      &:focus {
        background: var(--color-destructive-background-destructive-accent, #ef4444);
        box-shadow:
          0px 2px 16px 0px rgba(255, 255, 255, 0.6) inset,
          0px 2px 16px -2px rgba(220, 38, 38, 0.15),
          0px 4px 31px -1px rgba(220, 38, 38, 0.27),
          0px 4px 31px -1px rgba(220, 38, 38, 0.27);
      }

      &:disabled {
        opacity: 0.5;
        background: var(--color-destructive-background-destructive, #dc2626);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
      }

      &.transparent {
        color: var(--color-destructive-text-destructive-foreground, #dc2626);
        background: var(--color-destructive-background-destructive-secondary, rgba(220, 38, 38, 0.1));
        box-shadow: none;

        &:hover {
          background: var(--color-destructive-background-destructive-secondary-accent, rgba(220, 38, 38, 0.27));
        }

        &:focus {
          background: var(--color-destructive-background-destructive-secondary, rgba(220, 38, 38, 0.1));
        }

        &:disabled {
          opacity: 0.5;
          background: var(--color-destructive-background-destructive-secondary-accent, rgba(220, 38, 38, 0.27));
        }
      }

      &.ghost {
        color: var(--color-destructive-text-destructive-foreground, #dc2626);
        background: transparent;
        box-shadow: none;

        &:hover {
          background: var(--color-destructive-background-destructive-secondary, rgba(220, 38, 38, 0.1));
        }

        &:focus {
          background: var(--color-destructive-background-destructive-secondary-accent, rgba(220, 38, 38, 0.27));
        }

        &:disabled {
          opacity: 0.5;
        }
      }

      &.outline {
        border: 1px solid var(--color-destructive-border-destructive, #dc2626);
        background: var(--color-neutral-background-neutral, #131313);
        box-shadow: none;

        &:hover {
          background: var(--color-destructive-background-destructive-secondary, rgba(220, 38, 38, 0.1));
        }

        &:focus {
          background: var(--color-destructive-background-destructive-secondary, rgba(220, 38, 38, 0.1));
        }

        &:disabled {
          opacity: 0.5;
          background: var(--color-neutral-background-neutral, #131313);
        }
      }
    `,
    alert: css`
      color: var(--color-primary-text-primary-foreground, #fafafa);
      text-align: center;
      background: var(--color-alert-background-alert, #ca8a04);
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);

      &:hover {
        background: var(--color-alert-background-alert-accent, #eab308);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
      }

      &:focus {
        background: var(--color-alert-background-alert, #ca8a04);
      }

      &:disabled {
        opacity: 0.5;
        background: var(--color-alert-background-alert, #ca8a04);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
      }

      &.transparent {
        color: var(--color-alert-text-alert-foreground, #eab308);
        background: var(--color-alert-background-alert-secondary, rgba(234, 179, 8, 0.1));
        box-shadow: none;

        &:hover {
          background: var(--color-alert-background-alert-secondary-accent, rgba(234, 179, 8, 0.27));
        }

        &:focus {
          background: var(--color-alert-background-alert-secondary, rgba(234, 179, 8, 0.1));
        }

        &:disabled {
          background: var(--color-alert-background-alert-secondary-accent, rgba(234, 179, 8, 0.27));
        }
      }

      &.ghost {
        color: var(--color-alert-text-alert-foreground, #eab308);
        background: transparent;
        box-shadow: none;

        &:hover {
          background: var(--color-alert-background-alert-secondary, rgba(234, 179, 8, 0.1));
        }

        &:focus {
          background: var(--color-alert-background-alert-secondary-accent, rgba(234, 179, 8, 0.27));
        }

        &:disabled {
          opacity: 0.5;
        }
      }

      &.outline {
        border: 1px solid var(--color-alert-border-alert, #ca8a04);
        background: var(--color-neutral-background-neutral, #131313);
        box-shadow: none;

        &:hover {
          background: var(--color-alert-background-alert-secondary, rgba(234, 179, 8, 0.1));
        }

        &:focus {
          background: var(--color-alert-background-alert-secondary, rgba(234, 179, 8, 0.1));
        }

        &:disabled {
          opacity: 0.5;
        }
      }
    `,
    success: css`
      color: var(--color-primary-text-primary-foreground, #fafafa);
      text-align: center;
      background: var(--color-success-background-success, #16a34a);
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);

      &:hover {
        background: var(--color-success-background-success-accent, #22c55e);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
      }

      &:focus {
        background: var(--color-success-background-success, #16a34a);
      }

      &:disabled {
        opacity: 0.5;
        background: var(--color-success-background-success, #16a34a);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
      }

      &.transparent {
        color: var(--color-success-text-success-foreground, #22c55e);
        background: var(--color-success-background-success-secondary, rgba(34, 197, 94, 0.1));
        box-shadow: none;

        &:hover {
          background: var(--color-success-background-success-secondary-accent, rgba(34, 197, 94, 0.27));
        }

        &:focus {
          background: var(--color-success-background-success-secondary, rgba(34, 197, 94, 0.1));
        }

        &:disabled {
          background: var(--color-success-background-success-secondary-accent, rgba(34, 197, 94, 0.27));
          opacity: 0.5;
        }
      }

      &.ghost {
        color: var(--color-success-text-success-foreground, #22c55e);
        background: transparent;
        box-shadow: none;

        &:hover {
          background: var(--color-success-background-success-secondary, rgba(34, 197, 94, 0.1));
        }

        &:focus {
          background: var(--color-success-background-success-secondary-accent, rgba(34, 197, 94, 0.27));
        }

        &:disabled {
          opacity: 0.5;
        }
      }

      &.outline {
        border: 1px solid var(--color-success-border-success, #16a34a);
        background: var(--color-neutral-background-neutral, #131313);
        box-shadow: none;

        &:hover {
          background: var(--color-success-background-success-secondary, rgba(34, 197, 94, 0.1));
        }

        &:focus {
          background: var(--color-success-background-success-secondary, rgba(34, 197, 94, 0.1));
        }

        &:disabled {
          opacity: 0.5;
        }
      }
    `,
  },
  size: {
    default: css`
      border-radius: var(--radius-radius-md);
      display: inline-flex;
      height: 36px;
      min-width: 98px;
      padding: 8px 16px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      ${typographyStyles.bodyDefaultMd}
    `,
    lg: css`
      border-radius: var(--radius-radius-lg);
      display: inline-flex;
      height: 40px;
      padding: 8px 32px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      ${typographyStyles.bodyDefaultMd}
    `,
    sm: css`
      border-radius: var(--radius-radius-sm);
      display: inline-flex;
      height: 32px;
      padding: 8px 12px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      ${typographyStyles.bodySmallMd}
    `,
  },
};
