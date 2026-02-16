import { useCallback } from "react";
import { useWalletUi } from "@wallet-ui/react";
import { useDisconnect as useWagmiDisconnect } from "wagmi";
import { usePhantom } from "components/WalletConnectors/hooks/usePhantom";
import { wagmiConfig } from "config/wagmiConfig";

export const useDisconnect = () => {
  const wagmiDisconnect = useWagmiDisconnect({ config: wagmiConfig });
  const walletUi = useWalletUi();
  const phantomProvider = usePhantom();

  return useCallback(async () => {
    await wagmiDisconnect.disconnectAsync();
    await phantomProvider?.disconnect();
    walletUi.disconnect();
  }, [wagmiDisconnect, phantomProvider, walletUi]);
};
