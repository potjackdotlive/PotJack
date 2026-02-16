import { useQuery } from "@tanstack/react-query";
import { useConnection } from "wagmi";
import { QUERY_KEYS } from "constants/queryKeys";
import { getContractByChainId } from "utils/contractGetters/getContractByChainId";
import { getCoinDecimals } from "utils/getCoinDecimals";
import { ChainIdType } from "utils/types";

export const useGetTicketPriceInUsd = (enabled: boolean | undefined = true) => {
  const { chainId } = useConnection();
  const contract = getContractByChainId(chainId as ChainIdType);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.ABI.GET_TICKET_PRICE_IN_USD],
    queryFn: () => contract?.read?.getTicketPriceInUsd(),
    enabled: !!contract && enabled,
    refetchInterval: 10_000,
  });

  const price = data || 0;

  // usd decimals
  return Number(price) / getCoinDecimals(null);
};
