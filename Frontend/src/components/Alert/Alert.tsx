import { forwardRef, PropsWithChildren } from "react";
import { Alert as AntdAlert, AlertProps as AntDesignAlertProps } from "antd";
import { styles } from "./styles";

type BaseButtonProps = Omit<Partial<AntDesignAlertProps>, "type">;

export type AlertProps = PropsWithChildren<
  BaseButtonProps & {
    type?: keyof typeof styles.type;
    filled?: boolean;
  }
>;

export const Alert = forwardRef<HTMLButtonElement, AlertProps>(({ type = "warning", filled = false, ...props }) => {
  const typeCss = styles.type[type];

  return <AntdAlert css={[styles.root, typeCss]} className={filled ? "filled" : ""} {...props} />;
});

if (!import.meta.env.PROD) {
  Alert.displayName = "Alert";
}
