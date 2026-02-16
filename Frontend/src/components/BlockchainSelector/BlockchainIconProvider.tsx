import { FC, ReactNode } from "react";
import ChainEthereumIcon from "icons/ChainEthereum.svg?react";
import GlobeIcon from "icons/Globe.svg?react";
import ArbitrumNetworkIcon from "icons/networks/arbitrium_network.svg?react";
import AvalancheIcon from "icons/networks/avalanche_network.svg?react";
import BaseIcon from "icons/networks/base_network.svg?react";
import BnbIcon from "icons/networks/bnb-smart-chain_network.svg?react";
import OptimismIcon from "icons/networks/optimism_network.svg?react";
import PolygonIcon from "icons/networks/polygon_network.svg?react";
import SolanaIcon from "icons/networks/solana_network.svg?react";
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

type Props = {
  chainId: null | number | string;
  width?: number;
  height?: number;
};

export const BlockchainIconProvider: FC<Props> = ({ chainId, width = 16, height = 16 }): ReactNode => {
  const iconAttributes = {
    width,
    height,
  };

  switch (Number(chainId)) {
    case SEPOLIA_CHAIN_ID:
      return <ChainEthereumIcon {...iconAttributes} />;
    case SEPOLIA_ARBITRUM_CHAIN_ID:
      return <ArbitrumNetworkIcon {...iconAttributes} />;
    case SOLANA_CHAIN_ID:
      return <SolanaIcon {...iconAttributes} />;
    case POLYGON_AMOY_TESTNET_ID:
      return <PolygonIcon />;
    case OPTIMISM_SEPOLIA_TESTNET_ID:
      return <OptimismIcon {...iconAttributes} />;
    case AVALANCHE_FUJI_TESTNET_ID:
      return <AvalancheIcon {...iconAttributes} />;
    case BNB_SMART_CHAIN_TESTNET_ID:
      return <BnbIcon {...iconAttributes} />;
    case BASE_SEPOLIA_TESTNET_ID:
      return <BaseIcon {...iconAttributes} />;
    default:
      return <GlobeIcon {...iconAttributes} />;
  }
};
