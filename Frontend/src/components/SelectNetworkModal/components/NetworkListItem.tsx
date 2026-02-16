import { FC } from "react";
import { Flex } from "antd";
import { NetworkIconVariant } from "components/NetworkIconProvider/types";
import { NetworkItemInfo } from "components/SelectNetworkModal/components/NetworkItemInfo";
import { NetworkLogoShortname } from "pages/Play/components/NetworkList/components/NetworkLogoShortname";
import { raffleListItemStyles } from "pages/Play/components/RaffleListItem/raffleListItemStyles";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { getChainFullName } from "utils/getChainFullName";
import { getCoinsPerChain } from "utils/getCoinsPerChain";
import { ChainIdType } from "utils/types";

export type NetworkListItemProps = {
  pool: number;
  chainId: ChainIdType;
};

export const NetworkListItem: FC<NetworkListItemProps> = ({ chainId, pool }) => {
  const { networkId, setNetworkId } = usePlayContext();
  const entries = getCoinsPerChain(chainId).length;

  const handleClick = () => {
    if (!chainId || Number(chainId) === networkId) {
      return;
    }

    setNetworkId(chainId);
  };

  return (
    <Flex css={raffleListItemStyles.root} onClick={handleClick}>
      <NetworkLogoShortname chainId={chainId} chainName={getChainFullName(chainId)} variant={NetworkIconVariant.Grey} />
      <NetworkItemInfo chainId={chainId} pool={pool} entries={entries} />
    </Flex>
  );
};
