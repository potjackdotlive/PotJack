export const addressFormatter = (address: string, n: number | undefined = 4) => {
  if (!address) {
    return "";
  }

  const start = address.slice(0, n);
  const end = address.slice(-n);

  return `${start}...${end}`;
};
