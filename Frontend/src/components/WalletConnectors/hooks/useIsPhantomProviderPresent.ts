import { useWalletUi } from "@wallet-ui/react";

export const useIsPhantomProviderPresent = () => {
  const { wallets } = useWalletUi();
  return wallets.find((w) => w.name === "Phantom");
};
