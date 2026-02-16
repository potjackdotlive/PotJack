export type ProtocolCardType = {
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
};

export const protocolCardItemList: ProtocolCardType[] = [
  {
    imageUrl: "/decentralized-protocol/decentralized-protocol-card-1.png",
    title: "Built to Run Forever",
    subtitle: "[Built to Last]",
    description:
      "No central control. No downtime. The protocol is designed to operate independently and resist shutdowns.",
  },
  {
    imageUrl: "/decentralized-protocol/decentralized-protocol-card-2.png",
    title: "Open for Developers",
    subtitle: "[Integrate & Innovate]",
    description:
      "Proof of Luck’s smart contracts are public. You can plug them into your own dApp or build new interfaces—permissionless by design.",
  },
  {
    imageUrl: "/decentralized-protocol/decentralized-protocol-card-3.png",
    title: "Transparent by Code",
    subtitle: "[Verifiable at Every Step]",
    description:
      "Anyone can audit the contracts, track draws, and verify results. Fairness isn’t claimed—it’s proven on-chain.",
  },
];
