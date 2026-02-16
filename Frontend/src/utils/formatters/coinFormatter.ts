const defaultOptions: Intl.NumberFormatOptions = { minimumFractionDigits: 5 };

export const coinFormatter = (amount: number | string, options: Intl.NumberFormatOptions | undefined = {}): string => {
  if (!amount) {
    const defaultAmount = 0;
    return `${defaultAmount.toLocaleString("en-US", { ...defaultOptions, ...options })}`;
  }

  // Convert string to number if needed
  const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  // Check if the number is in scientific notation (very small or very large)
  const isScientificNotation = Math.abs(numericAmount) < 0.001 || Math.abs(numericAmount) >= 1000000;

  if (isScientificNotation) {
    // For very small numbers, use toFixed to avoid scientific notation
    if (Math.abs(numericAmount) < 0.001) {
      // Determine how many decimal places we need to show meaningful digits
      const decimalPlaces = Math.max(5, Math.ceil(-Math.log10(Math.abs(numericAmount))) + 5);
      const fixedNumber = (numericAmount || 0).toFixed(Math.min(decimalPlaces, 100));

      // Since toLocaleString has limits on fraction digits, return the fixed string directly
      // but format it to show only significant digits
      return parseFloat(fixedNumber).toString();
    }
  }

  return `${numericAmount.toLocaleString("en-US", { ...defaultOptions, ...options })}`;
};
