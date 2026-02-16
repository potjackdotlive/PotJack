import { FC } from "react";
import BitcoinIcon from "icons/BitcoinNetwork.svg?react";
import ArbitriumIcon from "icons/networks/arbitrium_network.svg?react";
import AvalancheIcon from "icons/networks/avalanche_network.svg?react";
import BaseIcon from "icons/networks/base_network.svg?react";
import BnbIcon from "icons/networks/bnb-smart-chain_network.svg?react";
import EthereumIcon from "icons/networks/ethereum_network.svg?react";
import OptimismIcon from "icons/networks/optimism_network.svg?react";
import PolygonIcon from "icons/networks/polygon_network.svg?react";
import SolanaIcon from "icons/networks/solana_network.svg?react";
import { NetworkIconElementProps } from "components/NetworkIconProvider/types";
import {
  AVALANCHE_FUJI_TESTNET_ID,
  BASE_SEPOLIA_TESTNET_ID,
  BITCOIN_CHAIN_ID,
  BNB_SMART_CHAIN_TESTNET_ID,
  OPTIMISM_SEPOLIA_TESTNET_ID,
  POLYGON_AMOY_TESTNET_ID,
  SEPOLIA_ARBITRUM_CHAIN_ID,
  SEPOLIA_CHAIN_ID,
  SOLANA_CHAIN_ID,
} from "utils/constants/chainsConstants";

export const NetworkIconDefault: FC<NetworkIconElementProps> = ({ chainId, styles }) => {
  switch (Number(chainId)) {
    case SEPOLIA_CHAIN_ID:
      return <EthereumIcon css={styles} />;
    case SEPOLIA_ARBITRUM_CHAIN_ID:
      return <ArbitriumIcon css={styles} />;
    case SOLANA_CHAIN_ID:
      return <SolanaIcon css={styles} />;
    case BITCOIN_CHAIN_ID:
      return <BitcoinIcon css={styles} />;
    case POLYGON_AMOY_TESTNET_ID:
      return <PolygonIcon css={styles} />;
    case OPTIMISM_SEPOLIA_TESTNET_ID:
      return <OptimismIcon css={styles} />;
    case AVALANCHE_FUJI_TESTNET_ID:
      return <AvalancheIcon css={styles} />;
    case BNB_SMART_CHAIN_TESTNET_ID:
      return <BnbIcon css={styles} />;
    case BASE_SEPOLIA_TESTNET_ID:
      return <BaseIcon css={styles} />;
    default:
      return <></>;
  }
};
