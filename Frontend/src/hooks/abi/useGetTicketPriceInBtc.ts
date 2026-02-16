import { useQuery } from "@tanstack/react-query";
import { useConnection } from "wagmi";
import { QUERY_KEYS } from "constants/queryKeys";
import { BTC_PER_TICKET } from "utils/constants/raffleConstants";
import { getContractByChainId } from "utils/contractGetters/getContractByChainId";
import { ChainIdType } from "utils/types";

export const useGetTicketPriceInBtc = (enabled: boolean | undefined = true) => {
  const { chainId } = useConnection();
  const contract = getContractByChainId(chainId as ChainIdType);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.ABI.GET_TICKET_PRICE_IN_BTC],
    queryFn: () => contract?.read?.getTicketPriceInBtc(),
    enabled: !!contract && enabled,
  });

  if (!data) {
    return BTC_PER_TICKET;
  }

  return Number(data) / 1e8;
};
