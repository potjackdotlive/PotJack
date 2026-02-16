import { useTranslation } from "react-i18next";
import { useConnect } from "@phantom/react-sdk";
import { connect as wagmiConnect } from "@wagmi/core";
import { useConnectors as useWagmiConnectors } from "wagmi";
import { warningNotification } from "components/Notification/Notification";
import { useDisconnect } from "components/WalletConnectors/hooks/useDisconnect";
import { SupportedConnector } from "components/WalletConnectors/types";
import { wagmiConfig } from "config/wagmiConfig";
import { TXT_CANNOT_CONNECT_WALLET, TXT_WALLET_PROVIDER_NOT_PRESENT } from "translations";

export const useConnectorsNoPhantom = (callback: () => void) => {
  const { t } = useTranslation();
  const wagmiConnectors = useWagmiConnectors();
  const disconnect = useDisconnect();
  const { connect } = useConnect();

  const mappedWagmiConnectors = wagmiConnectors
    .filter((connector) =>
      [SupportedConnector.WalletConnect, SupportedConnector.MetaMask].includes(connector.name as SupportedConnector),
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
        await disconnect();
        connect({ provider: "deeplink" }).catch((e) => {
          warningNotification({
            message: t(TXT_CANNOT_CONNECT_WALLET),
            description: t(TXT_WALLET_PROVIDER_NOT_PRESENT),
            duration: 5,
          });
        });
      },
    },
  ];

  return [...mappedWagmiConnectors, ...solanaConnectors];
};
