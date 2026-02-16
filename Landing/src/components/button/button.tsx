import React, { PropsWithChildren } from "react";
import { ButtonProps } from "./types";
import classes from "./button.module.scss";
import clsx from "clsx";
import Link from "next/link";

function Button({
  children,
  size = "xl",
  variant = "primary",
  startAdornment,
  endAdornment,
  className: customClassName,
  href,
  target,
  ...linkProps
}: PropsWithChildren<ButtonProps>) {
  const className = clsx(
    classes.root,
    size === "sm" && classes.sizeSm,
    size === "xl" && classes.sizeXl,
    variant === "primary" && classes.primary,
    variant === "tertiary" && classes.tertiary,
    variant === "tertiary" && size === "xl" && classes.tertiaryXl,
    customClassName && customClassName,
  );

  if (href) {
    return (
      <Link href={href} className={className} target={target} {...linkProps}>
        {startAdornment}
        <span>{children}</span>
        {endAdornment}
      </Link>
    );
  }

  return (
    <button className={className}>
      {startAdornment}
      <span>{children}</span>
      {endAdornment}
    </button>
  );
}

export default Button;
