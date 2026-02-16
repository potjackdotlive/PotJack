import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { useConnection } from "wagmi";
import { QUERY_KEYS } from "constants/queryKeys";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { getPublicClientByChainId } from "utils/clientGetters/getPublicClientByChainId";
import { getTokenAddress } from "utils/getTokenAddress";
import { ChainIdType, CoinType } from "utils/types";

const erc20Abi = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
  },
];

export const useCoinBalance = (coin: CoinType | null) => {
  const wagmiConnection = useConnection();
  const { networkId } = usePlayContext();
  const tokenAddress = getTokenAddress({ chainId: networkId as ChainIdType, coin: coin as CoinType });
  const publicClient = getPublicClientByChainId(networkId as ChainIdType);

  return useQuery({
    queryKey: [QUERY_KEYS.ABI.GET_WALLET_TOKEN_BALANCE, tokenAddress, networkId, wagmiConnection.address],
    refetchInterval: 60_000, // Refetch every minute for real-time updates
    staleTime: 0, // Always consider data stale for real-time updates
    queryFn: () =>
      publicClient?.readContract({
        address: tokenAddress as Address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [wagmiConnection.address],
      }),
    enabled: !!publicClient && !!coin && !!tokenAddress && !!wagmiConnection.address,
  });
};
