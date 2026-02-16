import { FC, PropsWithChildren } from "react";
import { Button, ButtonProps } from "components/Button/Button";
import { iconButtonStyles } from "./styles";

type Props = PropsWithChildren<ButtonProps>;

export const IconButton: FC<Props> = ({ children, size = "default", ...props }) => {
  const sizeStyles = iconButtonStyles.size[size];

  return (
    <Button css={[iconButtonStyles.root, sizeStyles]} {...props}>
      {children}
    </Button>
  );
};
