export type FaqItemType = {
  question: string;
  answer: string;
};

export const faqItemList: FaqItemType[] = [
  {
    question: "How does the winner selection work?",
    answer:
      "We use Chainlink VRF or a similar secure random system. It guarantees the winner is chosen fairly, with proof you can verify.",
  },
  {
    question: "What tokens are accepted?",
    answer:
      "Popular tokens from Ethereum, BNB Chain, Solana, Polygon, Arbitrum, Optimism, Avalanche, Base, Tron, Cronos, and Soneium.",
  },
  {
    question: "How do I know if I won?",
    answer:
      "As soon as a round ends, the winning wallet is displayed on the platform instantly and publicly.",
  },
  {
    question: "Is this lottery legal and secure?",
    answer:
      "Yes. It's fully decentralized and runs without middlemen. All results are on-chain and transparent.",
  },
  {
    question: "How often can I play?",
    answer:
      "There are multiple lotteries every day. You can enter any active round at any time.",
  },
  {
    question: "Is Proof of Luck a lottery or a form of gambling?",
    answer:
      "No. Proof of Luck is a consensus-driven prize protocol. Unlike traditional games of chance that operate in a black box, every outcome here is determined by a decentralized network and is cryptographically verified on-chain. We provide a transparent tool for verifiable events, not a gambling service.",
  },
];
