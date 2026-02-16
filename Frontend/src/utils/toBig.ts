import { Big } from "big.js";

export const toBig = (value: string | number | bigint | Big): Big => {
  if (value instanceof Big) {
    return value;
  }

  if (!value) {
    return Big(0);
  }

  if (typeof value === "bigint") {
    return new Big(value.toString());
  }

  return new Big(value);
};
