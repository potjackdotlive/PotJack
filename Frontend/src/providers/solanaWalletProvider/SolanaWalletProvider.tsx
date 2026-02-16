import { FC } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { createSolanaDevnet, createWalletUiConfig, WalletUi } from "@wallet-ui/react";
import { WalletUiGillProvider } from "@wallet-ui/react-gill";

type Props = {
  readonly children: React.ReactNode;
};

const config = createWalletUiConfig({
  clusters: [createSolanaDevnet()],
});

// todo: mainnet
// Mainnet-beta is the actuall mainnet (as of writing)
const endpoint = clusterApiUrl(true ? "devnet" : "mainnet-beta");

const wallets = [new PhantomWalletAdapter()];

export const SolanaWalletProvider: FC<Props> = ({ children }) => (
  <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets} autoConnect={false}>
      <WalletUi config={config}>
        <WalletUiGillProvider>{children}</WalletUiGillProvider>
      </WalletUi>
    </WalletProvider>
  </ConnectionProvider>
);
