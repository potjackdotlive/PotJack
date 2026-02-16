import type { PublicClient, Transport } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { createPublicClient, http } from "viem";
import { optimismSepolia } from "viem/chains";

let client: PublicClient<Transport, typeof optimismSepolia> | null = null;

export const getOptimismSepoliaRpcUrl = (): string | undefined => {
  const API_TOKEN = import.meta.env.VITE_ALCHEMY_RPC_API_TOKEN || "";
  return API_TOKEN ? `https://opt-sepolia.g.alchemy.com/v2/${API_TOKEN}` : undefined;
};

export const getOptimismSepoliaPublicClient = () => {
  if (!client) {
    const rpcUrl = getOptimismSepoliaRpcUrl();

    client = createPublicClient({
      chain: optimismSepolia,
      transport: http(import.meta.env.DEV ? import.meta.env.VITE_API_DEV_RPC : rpcUrl ? rpcUrl : undefined),
    });
  }

  return client;
};
