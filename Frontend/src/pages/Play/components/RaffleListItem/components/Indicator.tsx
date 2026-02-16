import { FC } from "react";
import { css } from "@emotion/react";
import { getColorByChain } from "utils/getColorByChain";
import { getColorByCoin } from "utils/getColorByCoin";
import { ChainIdType, CoinType } from "utils/types";

type Props = {
  token?: CoinType;
  chainId?: ChainIdType;
};

export const Indicator: FC<Props> = ({ token, chainId = null }) => {
  const backgroundColor = token ? getColorByCoin(token) : getColorByChain(chainId);

  return (
    <div
      css={css`
        width: 4px;
        height: calc(100% - 2px);
        border-radius: 99px;
      `}
      style={{ backgroundColor }}
    />
  );
};
