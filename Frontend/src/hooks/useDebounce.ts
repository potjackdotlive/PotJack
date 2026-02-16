import { useEffect, useState } from "react";

export const useDebounce = (value?: number | string, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const clearDebouncedValue = () => {
    if (typeof value === "number") {
      setDebouncedValue(0);
    } else {
      setDebouncedValue("");
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue, clearDebouncedValue };
};
