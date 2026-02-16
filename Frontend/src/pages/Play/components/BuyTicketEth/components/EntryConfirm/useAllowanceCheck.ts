import { useEffect, useState } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Address, ReadContractErrorType } from "viem";
import { useConnection, useReadContract } from "wagmi";
import { ERC20_ABI } from "contracts/Erc20Abi/ERC20_ABI";
import { toBig } from "utils/toBig";

type UseAllowanceCheckReturn = {
  allowanceCheckRefetch: (options?: RefetchOptions) => Promise<QueryObserverResult<unknown, ReadContractErrorType>>;
  allowanceDeficit: Big | null;
  isAllowanceFetched: boolean;
  isAllowanceCheckError: boolean;
};

type Props = {
  tokenAddress: Address;
  spenderAddress?: Address;
  requiredAllowance: Big;
  enabled?: boolean;
};

export const useAllowanceCheck = ({
  tokenAddress,
  spenderAddress,
  requiredAllowance,
  enabled = true,
}: Props): UseAllowanceCheckReturn => {
  const { address: userAddress, isConnected } = useConnection();
  const [allowanceDeficit, setAllowanceDeficit] = useState<Big | null>(null);

  const {
    data: decimals,
    isFetched: decimalsFetched,
    isError: decimalsError,
    refetch,
  } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "decimals",
    query: {
      enabled: enabled && isConnected && !!tokenAddress,
    },
  });

  const {
    data: allowance,
    isError: allowanceError,
    isFetched: allowanceFetched,
  } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [userAddress, spenderAddress],
    query: {
      enabled: enabled && isConnected && !!tokenAddress && !!spenderAddress && !!userAddress,
      gcTime: 0,
      staleTime: 0,
    },
  });

  const isFetched = allowanceFetched && decimalsFetched;

  useEffect(() => {
    if (!isFetched) return;
    if (!requiredAllowance || !decimals) return;

    const bigAllowance = toBig(allowance as bigint);
    const allowanceDeficit = bigAllowance.minus(Number(requiredAllowance));

    setAllowanceDeficit(allowanceDeficit);
  }, [isFetched, decimals, requiredAllowance.toString(), decimals, allowance]);

  return {
    allowanceCheckRefetch: refetch,
    allowanceDeficit,
    isAllowanceFetched: allowanceFetched || decimalsFetched,
    isAllowanceCheckError: allowanceError || decimalsError,
  };
};
