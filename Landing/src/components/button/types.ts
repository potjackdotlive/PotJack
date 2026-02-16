import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { LinkProps } from "next/link";

export type ButtonProps = {
  size?: "sm" | "xl";
  variant?: "primary" | "secondary" | "tertiary";
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
} & Partial<LinkProps>;
