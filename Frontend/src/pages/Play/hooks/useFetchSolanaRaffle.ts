import { useEffect, useState } from "react";
import { getTokenRaffle, TokenRaffle } from "anchor/src";
import { useSolanaRpc } from "pages/Play/hooks/useSolanaRpc";

export const useFetchSolanaRaffle = () => {
  const [tokenRaffle, setTokenRaffle] = useState<TokenRaffle | null>(null);
  const rpc = useSolanaRpc();

  useEffect(() => {
    getTokenRaffle(rpc).then((res) => {
      if (res[0].data) {
        setTokenRaffle(res[0].data);
      }
    });
  }, []);

  return tokenRaffle;
};
