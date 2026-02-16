import { FC } from "react";
import { NetworkListItem } from "pages/Play/components/NetworkList/components/NetworkListItem";
import { useRaffleRoundsAllNetworks } from "pages/Play/hooks/useRaffleRoundsAllNetworks";
import { BTC_PER_TICKET } from "utils/constants/raffleConstants";
import { ChainIdType } from "utils/types";

type Props = object;

export const NetworkList: FC<Props> = () => {
  const { dataByNetwork } = useRaffleRoundsAllNetworks();

  return (
    <>
      {Object.entries(dataByNetwork).map(([chainId, data]) => {
        const pool = (data.totalTickets - data.lotteriesActive) * BTC_PER_TICKET;

        return (
          <NetworkListItem
            key={chainId}
            chainId={Number(chainId) as unknown as ChainIdType}
            pool={pool < 0 ? 0 : pool}
            players={data.totalPlayers}
            tickets={data.totalTickets}
          />
        );
      })}
    </>
  );
};
