import "./App.css";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";
import { ApolloProvider } from "@apollo/client";
import { AddressType, darkTheme, PhantomProvider } from "@phantom/react-sdk";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import en_US from "antd/locale/en_US";
import { WagmiProvider } from "wagmi";
import { Notification } from "components/Notification/Notification";
import { antdTheme } from "config/antdTheme";
import { apolloClient } from "config/apolloClient";
import { queryClient } from "config/queryClient";
import { router } from "config/router";
import { wagmiConfig } from "config/wagmiConfig";
import WalletContext from "contexts/WalletContext/WalletContext";
import { SolanaWalletProvider } from "providers/solanaWalletProvider/SolanaWalletProvider";

const App = () => (
  <ApolloProvider client={apolloClient}>
    <SolanaWalletProvider>
      <PhantomProvider
        config={{
          providers: ["deeplink", "injected"], // Enabled auth methods
          appId: "1d84903c-0781-4b69-b7bd-8da31ff595bc",
          addressTypes: [AddressType.solana],
          authOptions: {
            redirectUrl: `${window.location.origin}//phantom/callback`,
          },
        }}
        theme={darkTheme}
        appIcon="https://phantom-portal20240925173430423400000001.s3.ca-central-1.amazonaws.com/icons/2feccb7c-6eca-417d-b6aa-2324b692e6ac.png"
        appName="Proof of Luck"
      >
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider theme={antdTheme} locale={en_US}>
              <AntdApp>
                <Notification />
                <Suspense fallback={null}>
                  <WalletContext>
                    <RouterProvider router={router} />
                  </WalletContext>
                </Suspense>
              </AntdApp>
            </ConfigProvider>
            <ReactQueryDevtools
              initialIsOpen // Determines if the devtools should be open by default (false for closed)
              buttonPosition="bottom-left" // Positions the toggle button in the bottom left corner of the screen
            />
          </QueryClientProvider>
        </WagmiProvider>
      </PhantomProvider>
    </SolanaWalletProvider>
  </ApolloProvider>
);

export default App;
