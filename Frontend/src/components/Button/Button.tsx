import { forwardRef, PropsWithChildren } from "react";
import { Button as AntdButton, ButtonProps as AntDesignButtonProps } from "antd";
import { styles } from "./styles";

type BaseButtonProps = Omit<Partial<AntDesignButtonProps>, "variant" | "type" | "size">;

export type ButtonProps = PropsWithChildren<
  BaseButtonProps & {
    variant?: keyof typeof styles.variant;
    size?: keyof typeof styles.size;
    ghost?: boolean;
    transparent?: boolean;
    outline?: boolean;
  }
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "brand" as keyof typeof styles.variant,
      size = "default" as keyof typeof styles.size,
      ghost = false,
      outline = false,
      transparent = false,
      ...props
    },
    forwardedRef,
  ) => {
    const variantCss = styles.variant[variant];
    const sizeStyles = styles.size[size];

    const classNames = [];
    if (ghost) {
      classNames.push("ghost");
    }

    if (outline) {
      classNames.push("outline");
    }

    if (transparent) {
      classNames.push("transparent");
    }

    return (
      <AntdButton rootClassName={classNames.join(" ")} css={[variantCss, sizeStyles]} {...props} ref={forwardedRef} />
    );
  },
);

if (!import.meta.env.PROD) {
  Button.displayName = "Button";
}
