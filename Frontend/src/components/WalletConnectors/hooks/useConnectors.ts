import { useTranslation } from "react-i18next";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { connect as wagmiConnect } from "@wagmi/core";
import { UiWallet, useWalletUiWallet } from "@wallet-ui/react";
import { useConnectors as useWagmiConnectors } from "wagmi";
import { warningNotification } from "components/Notification/Notification";
import { useDisconnect } from "components/WalletConnectors/hooks/useDisconnect";
import { useIsPhantomProviderPresent } from "components/WalletConnectors/hooks/useIsPhantomProviderPresent";
import { SupportedConnector } from "components/WalletConnectors/types";
import { wagmiConfig } from "config/wagmiConfig";
import { useIsInPhantomApp } from "hooks/useIsInPhantomApp";
import { TXT_CANNOT_CONNECT_WALLET, TXT_WALLET_PROVIDER_NOT_PRESENT } from "translations";

export const useConnectors = (callback: () => void) => {
  const { t } = useTranslation();
  const wagmiConnectors = useWagmiConnectors();
  const isInPhantomApp = useIsInPhantomApp();
  const disconnect = useDisconnect();
  const solanaWallet = useSolanaWallet();

  const phantomWallet = useIsPhantomProviderPresent();
  const useWalletUiWalletResult = useWalletUiWallet({ wallet: phantomWallet as UiWallet });

  const mappedWagmiConnectors = isInPhantomApp
    ? []
    : wagmiConnectors
        .filter((connector) =>
          [SupportedConnector.WalletConnect, SupportedConnector.MetaMask].includes(
            connector.name as SupportedConnector,
          ),
        )
        .map((connector) => ({
          name: connector.name,
          connect: async () => {
            await disconnect();
            callback();
            await wagmiConnect(wagmiConfig, { connector });
          },
        }));

  const solanaConnectors = [
    {
      name: "Phantom",
      connect: async () => {
        const phantom = solanaWallet?.wallets.find((w) => w.adapter.name === SupportedConnector.Phantom);
        if (phantom) {
          await disconnect();
          callback();
          await useWalletUiWalletResult.connect();
        } else {
          warningNotification({
            message: t(TXT_CANNOT_CONNECT_WALLET),
            description: t(TXT_WALLET_PROVIDER_NOT_PRESENT),
            duration: 5,
          });
        }
      },
    },
  ];

  return [...mappedWagmiConnectors, ...solanaConnectors];
};
