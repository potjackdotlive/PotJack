import type { PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

let sepoliaClient: PublicClient | null = null;

export const getSepoliaRpcUrl = (): string | undefined => {
  const API_TOKEN = import.meta.env.VITE_ALCHEMY_RPC_API_TOKEN || "";
  return API_TOKEN ? `https://eth-sepolia.g.alchemy.com/v2/${API_TOKEN}` : undefined;
};

export const getSepoliaPublicClient = () => {
  if (!sepoliaClient) {
    const rpcUrl = getSepoliaRpcUrl();

    sepoliaClient = createPublicClient({
      chain: sepolia,
      transport: http(import.meta.env.DEV ? import.meta.env.VITE_API_DEV_RPC : rpcUrl ? rpcUrl : undefined),
    });
  }

  return sepoliaClient;
};
