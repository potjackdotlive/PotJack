import { forwardRef, PropsWithChildren } from "react";
import { InputProps as AntDesignInputProps, Input as AntdInput } from "antd";
import { inputStyles as styles } from "./styles";

export type InputProps = PropsWithChildren<
  AntDesignInputProps & {
    type?: "text" | "textarea";
  }
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ type = "text", ...props }) => <AntdInput css={styles.root} {...props} />);

if (!import.meta.env.PROD) {
  Input.displayName = "Input";
}
