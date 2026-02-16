import type { PublicClient, Transport } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";

let client: PublicClient<Transport, typeof baseSepolia> | null = null;

export const getBaseSepoliaRpcUrl = (): string | undefined => {
  const API_TOKEN = import.meta.env.VITE_ALCHEMY_RPC_API_TOKEN || "";
  return API_TOKEN ? `https://base-sepolia.g.alchemy.com/v2/${API_TOKEN}` : undefined;
};

export const getBaseSepoliaPublicClient = () => {
  if (!client) {
    const rpcUrl = getBaseSepoliaRpcUrl();

    client = createPublicClient({
      chain: baseSepolia,
      transport: http(import.meta.env.DEV ? import.meta.env.VITE_API_DEV_RPC : rpcUrl ? rpcUrl : undefined),
    });
  }

  return client;
};
