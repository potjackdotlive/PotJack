import { CSSProperties, FC, PropsWithChildren } from "react";
import { Flex } from "antd";
import { useStyles } from "./useStyles";

type Props = {
  fullHeight?: number;
  customCss?: CSSProperties;
};

export const PlayContainer: FC<PropsWithChildren<Props>> = ({ children, fullHeight, customCss, ...props }) => {
  const styles = useStyles();

  return (
    <Flex css={styles.root} style={{ height: fullHeight ? "100%" : "auto", ...customCss }} {...props}>
      {children}
    </Flex>
  );
};
