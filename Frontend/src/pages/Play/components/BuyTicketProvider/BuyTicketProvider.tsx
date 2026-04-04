import React, { FC } from "react";
import { SerializedStyles } from "@emotion/react";
import { ButtonProps } from "components/Button/Button";
import { BuyTicketEthModal } from "pages/Play/components/BuyTicketEth/BuyTicketEthModal";
import { BuyTicketSolModal } from "pages/Play/components/BuyTicketSol/BuyTicketSolModal";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
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

export type BuyTicketModalProps = {
  hasTicket: boolean;
  raffleStarted: boolean;
  customTypographyStyles?: SerializedStyles;
  customButtonText?: string;
  buttonProps?: ButtonProps;
  showBuyTicketCall?: boolean;
  buyButtonDisabled?: boolean;
};

export const BuyTicketProvider: FC<BuyTicketModalProps> = (props) => {
  const { networkId } = usePlayContext();

  // todo: mainnet
  switch (Number(networkId)) {
    case SEPOLIA_CHAIN_ID:
    case SEPOLIA_ARBITRUM_CHAIN_ID:
    case POLYGON_AMOY_TESTNET_ID:
    case OPTIMISM_SEPOLIA_TESTNET_ID:
    case AVALANCHE_FUJI_TESTNET_ID:
    case BNB_SMART_CHAIN_TESTNET_ID:
    case BASE_SEPOLIA_TESTNET_ID:
      return <BuyTicketEthModal {...props} />;
    case SOLANA_CHAIN_ID:
      return <BuyTicketSolModal {...props} />;
    default:
      return null;
  }
};
