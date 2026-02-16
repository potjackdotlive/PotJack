import { useEffect } from "react";

export const useExternalNavigation = (url: string, condition: boolean = true) => {
  useEffect(() => {
    if (condition) {
      window.location.href = url;
    }
  }, [url, condition]);
};
