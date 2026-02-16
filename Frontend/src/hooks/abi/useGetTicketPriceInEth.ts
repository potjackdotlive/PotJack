import { useQuery } from "@tanstack/react-query";
import { formatEther } from "viem";
import { QUERY_KEYS } from "constants/queryKeys";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { getContractByChainId } from "utils/contractGetters/getContractByChainId";
import { toBig } from "utils/toBig";
import { ChainIdType } from "utils/types";

type Props = {
  enabled?: boolean;
  amount?: number;
};

export const useGetTicketPriceInEth = ({ enabled = true, amount = 1 }: Props) => {
  const { networkId } = usePlayContext();
  const contract = getContractByChainId(networkId as ChainIdType);

  const { data, isFetched } = useQuery({
    queryKey: [QUERY_KEYS.ABI.GET_TICKET_PRICE_NATIVE, networkId],
    queryFn: () => contract?.read?.getTicketPriceInNative(),
    enabled: !!contract && enabled,
  });

  const price = data || 0n;

  return {
    price,
    isFetched,
    formatted: formatEther(BigInt(toBig(price).mul(amount).toString())),
  };
};
