import { PhantomProvider } from "components/WalletConnectors/types";

export const getPhantomProvider = (showPhantomApp?: boolean) => {
  if ("phantom" in window) {
    const phantom = window.phantom?.solana as PhantomProvider;
    if (phantom?.isPhantom) {
      return phantom;
    }
  }

  if (showPhantomApp) {
    window.open("https://phantom.app/", "_blank");
  }
};
