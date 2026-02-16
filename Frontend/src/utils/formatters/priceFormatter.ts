export const priceFormatter = (amount: number | string, prefix: string | undefined = "$"): string => {
  if (!amount) {
    return `${prefix}0.00`;
  }

  return `${prefix}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
