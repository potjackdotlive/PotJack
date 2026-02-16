import { SerializedStyles } from "@emotion/react";
import { ChainIdType } from "utils/types";

export enum NetworkIconVariant {
  Default = "default",
  Grey = "grey",
}

export type NetworkIconElementProps = {
  chainId: ChainIdType | string;
  styles: SerializedStyles;
};
