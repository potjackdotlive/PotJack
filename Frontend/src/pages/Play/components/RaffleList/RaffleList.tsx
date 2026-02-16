import { FC } from "react";
import { RaffleListItem } from "pages/Play/components/RaffleListItem/RaffleListItem";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { getCoinsPerChain } from "utils/getCoinsPerChain";
import { ChainIdType } from "utils/types";

type Props = object;

export const RaffleList: FC<Props> = () => {
  const { networkId } = usePlayContext();
  const lotteries = getCoinsPerChain(networkId as ChainIdType);

  return (
    <>
      {lotteries.map((raffleItem) => (
        <RaffleListItem key={raffleItem} token={raffleItem} />
      ))}
    </>
  );
};
