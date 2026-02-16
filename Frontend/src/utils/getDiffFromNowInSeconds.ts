export const getDiffFromNowInSeconds = (inputTime: number): number => {
  // Normalize input to milliseconds
  const normalize = (t: number) => (t < 1e11 ? t * 1000 : t);

  const now = Date.now(); // Current time in ms
  const input = normalize(inputTime);

  const diffMs = Math.abs(now - input);
  return Math.floor(diffMs / 1000);
};
