import { useMemo } from "react";
import { createSolanaRpc } from "gill";

export const useSolanaRpcUrl = () => {
  const API_TOKEN = import.meta.env.VITE_ALCHEMY_RPC_API_TOKEN || "";
  // todo: change cluster on prod
  return API_TOKEN ? `https://solana-devnet.g.alchemy.com/v2/${API_TOKEN}` : "https://api.devnet.solana.com";
};

export const useSolanaRpc = () => {
  const rpcUrl = useSolanaRpcUrl();
  return useMemo(() => createSolanaRpc(rpcUrl), [rpcUrl]);
};
