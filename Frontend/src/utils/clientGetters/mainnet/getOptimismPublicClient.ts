import type { PublicClient, Transport } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { createPublicClient, http } from "viem";
import { optimism } from "viem/chains";

let optimismClient: PublicClient<Transport, typeof optimism> | null = null;

export const getOptimismRpcUrl = (): string | undefined => {
  const API_TOKEN = import.meta.env.VITE_ALCHEMY_RPC_API_TOKEN || "";
  // todo: update rpc for mainnet
  return API_TOKEN ? `https://eth-sepolia.g.alchemy.com/v2/${API_TOKEN}` : undefined;
};

export const getOptimismPublicClient = () => {
  if (!optimismClient) {
    const rpcUrl = getOptimismRpcUrl();

    optimismClient = createPublicClient({
      chain: optimism,
      transport: http(import.meta.env.DEV ? import.meta.env.VITE_API_DEV_RPC : rpcUrl ? rpcUrl : undefined),
    });
  }

  return optimismClient;
};
