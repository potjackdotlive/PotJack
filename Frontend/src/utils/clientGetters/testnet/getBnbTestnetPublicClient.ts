import type { PublicClient, Transport } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { createPublicClient, http } from "viem";
import { bscTestnet } from "viem/chains";

let client: PublicClient<Transport, typeof bscTestnet> | null = null;

export const getBnbRpcUrl = (): string | undefined => {
  const API_TOKEN = import.meta.env.VITE_ALCHEMY_RPC_API_TOKEN || "";
  return API_TOKEN ? `https://bnb-testnet.g.alchemy.com/v2/${API_TOKEN}` : undefined;
};

export const getBnbTestnetPublicClient = () => {
  if (!client) {
    const rpcUrl = getBnbRpcUrl();

    client = createPublicClient({
      chain: bscTestnet,
      transport: http(import.meta.env.DEV ? import.meta.env.VITE_API_DEV_RPC : rpcUrl ? rpcUrl : undefined),
    });
  }

  return client;
};
