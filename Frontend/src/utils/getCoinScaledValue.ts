import { BigNumberish } from "ethers";
import { getCoinDecimals } from "utils/getCoinDecimals";
import { CoinType } from "utils/types";

export const getCoinScaledValue = (value: BigNumberish, coin: CoinType | null) => {
  const decimalScale = getCoinDecimals(coin);

  return Number(value) / decimalScale;
};
