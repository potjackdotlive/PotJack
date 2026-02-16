import type { PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { createPublicClient, http } from "viem";
import { opBNB } from "viem/chains";

let bnbClient: PublicClient | null = null;

export const getBnbRpcUrl = (): string | undefined => {
  const API_TOKEN = import.meta.env.VITE_ALCHEMY_RPC_API_TOKEN || "";
  // todo: update rpc for mainnet
  return API_TOKEN ? `https://eth-sepolia.g.alchemy.com/v2/${API_TOKEN}` : undefined;
};

export const getBnbPublicClient = () => {
  if (!bnbClient) {
    const rpcUrl = getBnbRpcUrl();

    bnbClient = createPublicClient({
      chain: opBNB,
      transport: http(import.meta.env.DEV ? import.meta.env.VITE_API_DEV_RPC : rpcUrl ? rpcUrl : undefined),
    });
  }

  return bnbClient;
};
