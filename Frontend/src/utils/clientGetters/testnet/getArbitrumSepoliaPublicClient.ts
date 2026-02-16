import type { PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { createPublicClient, http } from "viem";
import { arbitrumSepolia } from "viem/chains";

let arbitrumClient: PublicClient | null = null;

export const getArbSepoliaRpcUrl = (): string | undefined => {
  const API_TOKEN = import.meta.env.VITE_ALCHEMY_RPC_API_TOKEN || "";
  return API_TOKEN ? `https://arb-sepolia.g.alchemy.com/v2/${API_TOKEN}` : undefined;
};

export const getArbSepoliaRpcWsUrl = (): string | undefined => {
  const API_TOKEN = import.meta.env.VITE_ALCHEMY_RPC_API_TOKEN || "";
  return API_TOKEN ? `wss://arb-sepolia.g.alchemy.com/v2/${API_TOKEN}` : undefined;
};

export const getArbitrumSepoliaPublicClient = () => {
  if (!arbitrumClient) {
    arbitrumClient = createPublicClient({
      chain: arbitrumSepolia,
      transport: http(getArbSepoliaRpcUrl()),
    });
  }

  return arbitrumClient;
};
