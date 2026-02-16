import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { TransparentSelect } from "components/TransparentSelect/TransparentSelect";
import { useCoinList } from "hooks/useCoinList";
import { useCoinOptions } from "hooks/useCoinOptions";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { LeaderBoardTable } from "pages/Leaderboard/components/LeaderboardTable/LeaderboardTable";
import { Leaders } from "pages/Leaderboard/components/Leaders/Leaders";
import { commonStyles } from "styles/commonStyles";
import { TXT_LEADERBOARD } from "translations";
import { SEPOLIA_CHAIN_ID } from "utils/constants/chainsConstants";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { getBlockchainSelectItems } from "utils/getBlockchainSelectItems";
import { getCoinsPerChain } from "utils/getCoinsPerChain";
import { getContractAddressByChain } from "utils/getContractAddressByChain";
import { getTokenAddress } from "utils/getTokenAddress";
import { ChainIdType, CoinType } from "utils/types";
import {
  avalancheCoinTypes,
  baseCoinTypes,
  bnbCoinTypes,
  ethCoinTypes,
  optimismCoinTypes,
  polygonCoinTypes,
  solCoinTypes,
} from "./utils";

export const Leaderboard = () => {
  const { t } = useTranslation();
  const items = getBlockchainSelectItems();
  const { sm, md } = useMediaQueryMatches();
  const [network, setNetwork] = useState<null | ChainIdType>(SEPOLIA_CHAIN_ID);
  const [coin, setCoin] = useState<null | CoinType>(SepoliaCoinType.Ethereum);

  const coins = useCoinList(network);
  const coinOptions = useCoinOptions(coins);

  const contractAddress = getContractAddressByChain(network);
  const tokenAddress = getTokenAddress({ chainId: network, coin }) || "";

  const selectHandler = (coin: string | number) => {
    setCoin(coin as CoinType);
  };

  const onNetworkChange = (value: string | number) => {
    setNetwork(value as ChainIdType);
    setCoin(null);
  };

  useEffect(() => {
    const coins = getCoinsPerChain(network);

    const defaultCoin =
      coins.find((coin: CoinType) =>
        [
          ...ethCoinTypes,
          ...solCoinTypes,
          ...polygonCoinTypes,
          ...avalancheCoinTypes,
          ...baseCoinTypes,
          ...bnbCoinTypes,
          ...optimismCoinTypes,
        ].includes(coin),
      ) || coins[0];

    setCoin(defaultCoin);
  }, [network]);

  return (
    <Flex justify="center" gap={40} vertical align="center">
      <Flex gap={16} wrap="wrap" justify="center" vertical={!sm} align="center">
        <Typography.Title css={commonStyles.textMuted}>{t(TXT_LEADERBOARD)}</Typography.Title>
        <TransparentSelect isCoin={false} options={items} value={network as number} onChange={onNetworkChange} />
        <TransparentSelect isCoin={true} value={coin || ""} onChange={selectHandler} options={coinOptions} />
      </Flex>
      <Flex gap={md ? 24 : 32} vertical align="center" style={{ width: "100%" }}>
        <Leaders contractAddress={contractAddress} tokenAddress={tokenAddress} />
        <LeaderBoardTable contractAddress={contractAddress} tokenAddress={tokenAddress} />
      </Flex>
    </Flex>
  );
};
