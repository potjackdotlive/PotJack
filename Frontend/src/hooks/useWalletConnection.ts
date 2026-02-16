import { useMemo } from "react";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { useWalletUi } from "@wallet-ui/react";
import { useConnection } from "wagmi";
import {
  AVALANCHE_FUJI_TESTNET_ID,
  BASE_SEPOLIA_TESTNET_ID,
  BNB_SMART_CHAIN_TESTNET_ID,
  OPTIMISM_SEPOLIA_TESTNET_ID,
  POLYGON_AMOY_TESTNET_ID,
  SEPOLIA_ARBITRUM_CHAIN_ID,
  SEPOLIA_CHAIN_ID,
  SOLANA_CHAIN_ID,
} from "utils/constants/chainsConstants";
import { NetworkType } from "utils/enums/networks";
import { ChainIdType } from "utils/types";

export const useWalletConnection = () => {
  const wagmiConnection = useConnection();
  const solanaWallet = useSolanaWallet();
  const solanaWalletUi = useWalletUi();

  return useMemo(() => {
    const isWagmiConnected = wagmiConnection.isConnected;
    const isPhantomConnected = solanaWallet.connected || solanaWalletUi?.connected;

    const address = wagmiConnection?.address || solanaWallet.publicKey?.toBase58() || solanaWalletUi?.account?.address;

    const connectedNetworkTypes: NetworkType[] = [];
    const connectedNetworkIds: ChainIdType[] = [];

    if (isWagmiConnected) {
      connectedNetworkTypes.push(NetworkType.Ethereum);
      connectedNetworkIds.push(
        SEPOLIA_CHAIN_ID,
        SEPOLIA_ARBITRUM_CHAIN_ID,
        POLYGON_AMOY_TESTNET_ID,
        OPTIMISM_SEPOLIA_TESTNET_ID,
        BASE_SEPOLIA_TESTNET_ID,
        BNB_SMART_CHAIN_TESTNET_ID,
        AVALANCHE_FUJI_TESTNET_ID,
      );
    }

    if (isPhantomConnected) {
      connectedNetworkTypes.push(NetworkType.Solana);
      connectedNetworkIds.push(SOLANA_CHAIN_ID);
    }

    return {
      address,
      isConnected: isWagmiConnected || isPhantomConnected,
      connectedNetworkTypes,
      connectedNetworkIds,
    };
  }, [
    wagmiConnection.isConnected,
    wagmiConnection.address,
    solanaWallet.connected,
    solanaWallet.publicKey,
    solanaWalletUi?.connected,
    solanaWalletUi?.account?.address,
  ]);
};
