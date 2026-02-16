export const amountFormatter = (amount: number): string => {
  if (!amount) {
    return "0";
  }

  return `${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
};
