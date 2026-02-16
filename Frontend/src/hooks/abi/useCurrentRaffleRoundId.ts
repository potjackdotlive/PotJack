import { useQuery } from "@tanstack/react-query";
import { useConnection } from "wagmi";
import { QUERY_KEYS } from "constants/queryKeys";
import { getContractByChainId } from "utils/contractGetters/getContractByChainId";
import { Address, ChainIdType } from "utils/types";

type Props = [token: Address];

export const useCurrentRaffleRoundId = (props: Props) => {
  const { chainId } = useConnection();
  const contract = getContractByChainId(chainId as ChainIdType);

  return useQuery({
    queryKey: [QUERY_KEYS.ABI.CURRENT_RAFFLE_ROUND_ID, ...props],
    queryFn: () => contract?.read?.getCurrentRaffleRoundId(props),
    enabled: !!contract && !!props?.[0],
  });
};
