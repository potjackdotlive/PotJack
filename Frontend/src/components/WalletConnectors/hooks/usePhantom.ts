import { useEffect, useState } from "react";
import { getPhantomProvider } from "components/WalletConnectors/getPhantomProvider";
import { PhantomProvider } from "components/WalletConnectors/types";

export const usePhantom = () => {
  const [phantom, setPhantom] = useState<PhantomProvider | null>(null);

  useEffect(() => {
    let retries = 0;
    const maxRetries = 50; // 5 seconds total

    const checkForPhantom = () => {
      const provider = getPhantomProvider();

      if (provider?.isPhantom) {
        setPhantom(provider);
        return true;
      }

      return false;
    };

    if (checkForPhantom()) return;

    const interval = setInterval(() => {
      if (checkForPhantom() || retries >= maxRetries) {
        clearInterval(interval);
      }
      retries++;
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return phantom;
};
