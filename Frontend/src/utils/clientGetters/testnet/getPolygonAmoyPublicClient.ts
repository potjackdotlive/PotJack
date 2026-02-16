import type { PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { createPublicClient, http } from "viem";
import { polygonAmoy } from "viem/chains";

let sepoliaClient: PublicClient | null = null;

export const getPolygonAmoyRpcUrl = (): string | undefined => {
  const API_TOKEN = import.meta.env.VITE_ALCHEMY_RPC_API_TOKEN || "";
  return API_TOKEN ? `https://polygon-amoy.g.alchemy.com/v2/${API_TOKEN}` : undefined;
};

export const getPolygonAmoyPublicClient = () => {
  if (!sepoliaClient) {
    const rpcUrl = getPolygonAmoyRpcUrl();

    const transport = import.meta.env.DEV ? import.meta.env.VITE_API_DEV_RPC : rpcUrl ? rpcUrl : undefined;

    sepoliaClient = createPublicClient({
      chain: polygonAmoy,
      transport: http(transport),
    });
  }

  return sepoliaClient;
};
