import type { PublicClient, Transport } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { createPublicClient, http } from "viem";
import { avalancheFuji } from "viem/chains";

let client: PublicClient<Transport, typeof avalancheFuji> | null = null;

export const getAvalancheFujiRpcUrl = (): string | undefined => {
  const API_TOKEN = import.meta.env.VITE_ALCHEMY_RPC_API_TOKEN || "";
  return API_TOKEN ? `https://avax-fuji.g.alchemy.com/v2/${API_TOKEN}` : undefined;
};

export const getAvalancheFujiPublicClient = () => {
  if (!client) {
    const rpcUrl = getAvalancheFujiRpcUrl();

    client = createPublicClient({
      chain: avalancheFuji,
      transport: http(import.meta.env.DEV ? import.meta.env.VITE_API_DEV_RPC : rpcUrl ? rpcUrl : undefined),
    });
  }

  return client;
};
