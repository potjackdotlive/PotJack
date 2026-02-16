import { useQuery } from "@tanstack/react-query";
import { useWalletUi } from "@wallet-ui/react";
import { useWalletUiGill } from "@wallet-ui/react-gill";
import { address, lamportsToSol } from "gill";
import { QUERY_KEYS } from "constants/queryKeys";

export const useSolBalance = () => {
  const client = useWalletUiGill();
  const { account, connected } = useWalletUi();

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.SOL.GET_BALANCE, account],
    refetchInterval: 10_000,
    queryFn: () => client.rpc.getBalance(address(account?.address as string)).send(),
    enabled: !!account?.address && connected,
  });

  return data?.value ? lamportsToSol(data.value) : "0";
};
