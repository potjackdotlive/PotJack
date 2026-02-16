import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { UiWallet, useWalletUiWallet } from "@wallet-ui/react";
import { useDisconnect as useWagmiDisconnect } from "wagmi";
import { errorNotification, warningNotification } from "components/Notification/Notification";
import { useIsPhantomProviderPresent } from "components/WalletConnectors/hooks/useIsPhantomProviderPresent";
import { SupportedConnector } from "components/WalletConnectors/types";
import { wagmiConfig } from "config/wagmiConfig";
import {
  TXT_CANNOT_CONNECT_WALLET,
  TXT_ERROR,
  TXT_FAILED_TO_CONNECT_WALLET,
  TXT_WALLET_PROVIDER_NOT_PRESENT,
} from "translations";

export const useConnectPhantom = (callback?: () => void) => {
  const solanaWallet = useSolanaWallet();
  const { disconnect: disconnectWagmi } = useWagmiDisconnect({ config: wagmiConfig });
  const phantomWallet = useIsPhantomProviderPresent();
  const useWalletUiWalletResult = useWalletUiWallet({ wallet: phantomWallet as UiWallet });
  const { t } = useTranslation();

  return useMemo(
    () => async () => {
      const phantom = solanaWallet?.wallets.find((w) => w.adapter.name === SupportedConnector.Phantom);

      if (!phantom || phantom.readyState !== "Installed") {
        warningNotification({
          message: t(TXT_CANNOT_CONNECT_WALLET),
          description: t(TXT_WALLET_PROVIDER_NOT_PRESENT),
          duration: 5,
        });
        return;
      }

      useWalletUiWalletResult
        .connect()
        .then(() => {
          setTimeout(() => {
            callback?.();
            disconnectWagmi();
          }, 100);
        })
        .catch((err) => {
          errorNotification({
            message: t(TXT_ERROR),
            description: err?.message || t(TXT_FAILED_TO_CONNECT_WALLET),
            duration: 5,
          });
        });
    },
    [callback, solanaWallet, t],
  );
};
