import { useQuery } from "@tanstack/react-query";
import { formatEther } from "viem";
import { QUERY_KEYS } from "constants/queryKeys";
import { useGetTicketPriceInEth } from "hooks/abi/useGetTicketPriceInEth";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { useGetTicketPriceForSol } from "pages/Play/hooks/useGetTicketPriceForSol";
import { getContractByChainId } from "utils/contractGetters/getContractByChainId";
import { AvalancheFujiCoinType } from "utils/enums/tokens/avalancheFujiTokens";
import { BnbCoinType } from "utils/enums/tokens/bnbTestnetTokens";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { SolanaTokens } from "utils/enums/tokens/solanaTokens";
import { getCoinDecimals } from "utils/getCoinDecimals";
import { getTokenAddress } from "utils/getTokenAddress";
import { toBig } from "utils/toBig";
import { Address, ChainIdType, CoinType } from "utils/types";

type Props = {
  coin: CoinType | null;
  amount?: number;
};

export const useGetTicketPriceForToken = ({ coin, amount = 1 }: Props, enabled: boolean | undefined = true) => {
  const { networkId } = usePlayContext();
  const contract = getContractByChainId(networkId as ChainIdType);
  const tokenAddress = getTokenAddress({ chainId: networkId as ChainIdType, coin });

  const isNativeCoin =
    !!coin && ([SepoliaCoinType.Ethereum, BnbCoinType.BNB, AvalancheFujiCoinType.AVAX] as CoinType[]).includes(coin);
  const isSol = coin === SolanaTokens.Solana;
  const decimals = getCoinDecimals(coin);

  const { data, isFetched } = useQuery({
    queryKey: [QUERY_KEYS.ABI.GET_TICKET_PRICE_FOR_TOKEN, tokenAddress, coin, networkId],
    queryFn: () => contract?.read?.getTicketPriceForToken([tokenAddress as Address]),
    enabled: !!contract && enabled && !!tokenAddress && !isNativeCoin,
  });

  const {
    price: priceEth,
    formatted: formattedEth,
    isFetched: isFetchedEth,
  } = useGetTicketPriceInEth({
    enabled: isNativeCoin,
    amount,
  });

  const solPriceQuery = useGetTicketPriceForSol(isSol);

  if (isSol && solPriceQuery?.data) {
    return {
      isFetched: solPriceQuery?.isFetched,
      firstBuyerReward: Number(solPriceQuery.data),
      formatted: toBig(solPriceQuery.data).mul(amount).toString(),
      price: toBig(solPriceQuery.data).mul(amount),
    };
  }

  const price = data || 0n;

  const isEtherDecimals = decimals === 1e18;

  if (isNativeCoin) {
    return {
      isFetched: isFetchedEth,
      firstBuyerReward: formatEther(priceEth),
      formatted: formattedEth,
      price: toBig(priceEth).mul(amount),
    };
  }

  return {
    isFetched,
    firstBuyerReward: isEtherDecimals ? formatEther(BigInt(price)) : Number(price) / decimals,
    formatted: isEtherDecimals ? formatEther(BigInt(price * BigInt(amount))) : (Number(price) * amount) / decimals,
    price: toBig(price).mul(amount),
  };
};
