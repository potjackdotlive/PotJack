import { FC } from "react";
import { css } from "@emotion/react";
import { NetworkIconDefault } from "components/NetworkIconProvider/NetworkIconDefault";
import { NetworkIconGrey } from "components/NetworkIconProvider/NetworkIconGrey";
import { NetworkIconVariant } from "components/NetworkIconProvider/types";
import { ChainIdType } from "utils/types";

type Props = {
  chainId: ChainIdType | string;
  width?: number;
  height?: number;
  variant?: NetworkIconVariant;
};

export const NetworkIconProvider: FC<Props> = ({ chainId, height = 16, width = 16, variant = "default" }) => {
  const styles = css`
    width: ${width}px;
    height: ${height}px;
    border-radius: 50%;
  `;

  switch (variant) {
    case NetworkIconVariant.Grey:
      return <NetworkIconGrey chainId={chainId} styles={styles} />;
    default:
      return <NetworkIconDefault chainId={chainId} styles={styles} />;
  }
};
