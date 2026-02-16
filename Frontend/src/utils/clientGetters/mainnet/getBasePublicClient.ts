import type { PublicClient, Transport } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

let baseClient: PublicClient<Transport, typeof base> | null = null;

export const getBaseRpcUrl = (): string | undefined => {
  const API_TOKEN = import.meta.env.VITE_ALCHEMY_RPC_API_TOKEN || "";
  // todo: update rpc for mainnet
  return API_TOKEN ? `https://base-sepolia.g.alchemy.com/v2/${API_TOKEN}` : undefined;
};

export const getBasePublicClient = () => {
  if (!baseClient) {
    const rpcUrl = getBaseRpcUrl();

    baseClient = createPublicClient({
      chain: base,
      transport: http(import.meta.env.DEV ? import.meta.env.VITE_API_DEV_RPC : rpcUrl ? rpcUrl : undefined),
    });
  }

  return baseClient;
};
