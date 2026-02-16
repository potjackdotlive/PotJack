import { css } from "@emotion/react";
import { RAFFLE_PROGRAM_ADDRESS as SOLANA_RAFFLE_PROGRAM_ADDRESS } from "anchor/src";
import {
  ContractAddressArbitrumSepolia,
  ContractAddressAvalancheFuji,
  ContractAddressBaseSepolia,
  ContractAddressBnbSmartChainTestnet,
  ContractAddressOptimismSepolia,
  ContractAddressPolygonAmoy,
  ContractAddressSepolia,
} from "utils/contractAddresses";

type GetTransactionExplorerLinkParams = {
  contractAddress: string;
  transactionHash: string;
};

export const getTransactionExplorerLink = ({ contractAddress, transactionHash }: GetTransactionExplorerLinkParams) => {
  switch (contractAddress) {
    case ContractAddressSepolia:
      // todo real explorers on prod
      return `https://sepolia.etherscan.io/tx/${transactionHash}`;
    case ContractAddressPolygonAmoy:
      return `https://amoy.polygonscan.com/tx/${transactionHash}`;
    case ContractAddressArbitrumSepolia:
      return `https://sepolia.arbiscan.io/tx/${transactionHash}`;
    case ContractAddressOptimismSepolia:
      return `https://optimism-sepolia.blockscout.com/tx/${transactionHash}`;
    case ContractAddressAvalancheFuji:
      return `https://testnet.snowtrace.io/tx/${transactionHash}`;
    case ContractAddressBnbSmartChainTestnet:
      return `https://testnet.bscscan.com/tx/${transactionHash}`;
    case ContractAddressBaseSepolia:
      return `https://sepolia.basescan.org/tx/${transactionHash}`;
    case SOLANA_RAFFLE_PROGRAM_ADDRESS:
      // todo: cluster
      return `https://explorer.solana.com/tx/${transactionHash}?cluster=devnet`;
    default:
      return "";
  }
};

type DefineColorCssByBadgeParams = {
  hasCrownBadge: boolean;
  hasDiamondBadge: boolean;
  hasWhaleBadge: boolean;
};

export const defineColorCssByBadge = (props: DefineColorCssByBadgeParams) => {
  switch (true) {
    case props.hasCrownBadge:
      return css`
        color: var(--yellow-400, #facc15);
      `;
    case props.hasDiamondBadge:
      return css`
        color: var(--sky-400, #38bdf8);
      `;
    case props.hasWhaleBadge:
      return css`
        color: var(--fuchsia-400, #e879f9);
      `;
    default:
      return css`
        color: var(--color-neutral-text-neutral-foreground, #fff);
      `;
  }
};
