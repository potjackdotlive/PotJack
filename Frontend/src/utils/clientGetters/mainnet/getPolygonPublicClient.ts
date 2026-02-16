import type { PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";

let polygonClient: PublicClient | null = null;

export const getPolygonRpcUrl = (): string | undefined => {
  const API_TOKEN = import.meta.env.VITE_ALCHEMY_RPC_API_TOKEN || "";
  // todo: update rpc for mainnet
  return API_TOKEN ? `https://polygon-amoy.g.alchemy.com/v2/${API_TOKEN}` : undefined;
};

export const getPolygonPublicClient = () => {
  if (!polygonClient) {
    const rpcUrl = getPolygonRpcUrl();

    polygonClient = createPublicClient({
      chain: polygon,
      transport: http(import.meta.env.DEV ? import.meta.env.VITE_API_DEV_RPC : rpcUrl ? rpcUrl : undefined),
    });
  }

  return polygonClient;
};
