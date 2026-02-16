import DollarIcon from "@/components/icons/dollar-icon";
import LockIcon from "@/components/icons/lock-icon";
import HeartEmptyIcon from "@/components/icons/heart-empty-icon";
import MacbookIcon from "@/components/icons/macbook-icon";
import EarthIcon from "@/components/icons/earth-icon";
import { AdvantageCategoryType } from "@/components/sections/advantage-section/types";

export const advantageCategoryList: AdvantageCategoryType[] = [
  {
    title: "Your Winnings, Instantly Yours",
    clarification: "[Non-Custodial by Design]",
    items: [
      {
        Icon: DollarIcon,
        title: "Direct Payouts, No Delays",
        description:
          "All funds, including your potential winnings, stay secured within the smart contract. Winners receive their prizes directly and instantly to their wallets. We never hold your assets",
      },
      {
        Icon: LockIcon,
        title: 'Play with Peace of Mind ["Just Code" Philosophy]',
        description:
          'Our non-custodial model means the platform is "just code." This minimizes regulatory concerns and maximizes your security. The rules are set, transparent, and can\'t be changed',
      },
      {
        Icon: HeartEmptyIcon,
        title: "Play Your Way, Across Chains [Multi-Chain Freedom]",
        description:
          "More choices, more fun. Proof of Luck supports major chains like Ethereum, BNB Chain, Solana, Polygon, Arbitrum, Optimism, Avalanche, Base, Tron, Cronos, and Soneium. Pick your favorite and join the game!",
      },
    ],
  },
  {
    title: "Absolute Proof of Fairness",
    clarification: "[Verifiable & Immutable]",
    items: [
      {
        Icon: MacbookIcon,
        title: "Audit the Code, Trust the Outcome",
        description:
          "The Proof of Luck protocol's smart contracts are open-source. Anyone can inspect the code and verify its integrity and fairness. Once deployed, the core lottery logic is unchangeable",
      },
      {
        Icon: EarthIcon,
        title: "Verify, Don't Just Trust",
        description:
          "The real power is on-chain. You can verify all draws and transactions via any blockchain explorer, MetaMask, or WalletConnect",
      },
    ],
  },
];
