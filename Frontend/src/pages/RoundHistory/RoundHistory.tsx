import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import { TransparentSelect } from "components/TransparentSelect/TransparentSelect";
import { ROUTES } from "constants/routes";
import { useGetRoundHistoryStatsQuery } from "graphql/gen/hooks";
import { GetRoundHistoryStatsQuery } from "graphql/gen/types";
import { useChainCoinSet } from "hooks/useChainCoinSet";
import { useCoinList } from "hooks/useCoinList";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { useWalletConnection } from "hooks/useWalletConnection";
import { ClaimWinnings } from "pages/RoundHistory/components/ClaimWinnings/ClaimWinnings";
import { HistorySwitch } from "pages/RoundHistory/components/HistorySwitch/HistorySwitch";
import { HistoryTable } from "pages/RoundHistory/components/HistoryTable/HistoryTable";
import { commonStyles } from "styles/commonStyles";
import { TXT_ROUND_HISTORY } from "translations";
import { SEPOLIA_CHAIN_ID, SOLANA_CHAIN_ID } from "utils/constants/chainsConstants";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { getBlockchainSelectItems } from "utils/getBlockchainSelectItems";
import { getContractAddressByChain } from "utils/getContractAddressByChain";
import { getTokenAddress } from "utils/getTokenAddress";
import { ChainIdType, CoinType } from "utils/types";
import { Search } from "./components/Search/Search";

const PAGE_SIZE = 10;

export const RoundHistory = () => {
  const walletUiConnection = useWalletConnection();
  const { t } = useTranslation();
  const { sm } = useMediaQueryMatches();
  const params = useParams<{ network: string; token: CoinType }>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [myRoundsOnly, setMyRoundsOnly] = useState(false);
  const walletAddress =
    myRoundsOnly && walletUiConnection.isConnected && walletUiConnection.address
      ? walletUiConnection.address
      : undefined;
  const [roundsData, setRoundsData] = useState<GetRoundHistoryStatsQuery["winStats"]["content"]>([]);
  const [coin, setCoin] = useState<CoinType>(params?.token || SepoliaCoinType.Ethereum);
  const [network, setNetwork] = useState<ChainIdType>(
    params?.network ? (Number(params.network) as ChainIdType) : SEPOLIA_CHAIN_ID,
  );

  const { data, fetchMore, loading } = useGetRoundHistoryStatsQuery({
    variables: {
      contractAddress: getContractAddressByChain(network),
      tokenAddress: getTokenAddress({ coin, chainId: network }) || "",
      walletAddress,
      search,
      limit: PAGE_SIZE * page,
      offset: 0,
    },
    nextFetchPolicy: "cache-first",
    pollInterval: 60_000,
  });

  const resetFilters = () => {
    setSearch("");
    setMyRoundsOnly(false);
    setPage(1);
  };

  const canLoadMore = !!data && data.winStats.totalPages > 1;

  const loadMoreHandler = () => {
    if (!canLoadMore) {
      return;
    }

    fetchMore({
      variables: {
        contractAddress: getContractAddressByChain(network),
        tokenAddress: getTokenAddress({ coin, chainId: network }) || "",
        walletAddress,
        search,
        limit: PAGE_SIZE * (page + 1),
        offset: 0,
      },
    }).then((result) => {
      setRoundsData(result?.data ? result.data.winStats.content : []);
      setPage((prev) => prev + 1);
    });
  };

  const chainCoinSet = useChainCoinSet();

  const onNetworkChange = (network: string | number) => {
    setNetwork(network as ChainIdType);
    setCoin(chainCoinSet[network as ChainIdType][0] as CoinType);
  };

  const onCoinChange = (coin: string | number) => {
    setCoin(coin as CoinType);
  };

  const networkItems = getBlockchainSelectItems();

  const coinList = useCoinList(network as ChainIdType);
  const coinOptions = coinList.map((coin) => ({
    value: coin,
    label: coin,
  }));

  useEffect(() => {
    setPage(1);
  }, [network, coin, search, walletAddress]);

  useEffect(() => {
    setRoundsData(data ? data?.winStats.content : []);
  }, [data]);

  useEffect(() => {
    history.pushState({}, "", ROUTES.RoundHistory);
  }, []);

  return (
    <Flex
      justify="center"
      gap={40}
      vertical
      align="center"
      css={css`
        margin-top: 24px;
      `}
    >
      <Flex gap={24} wrap="wrap" align="center" justify="center" vertical css={commonStyles.fullWidth}>
        {network === SOLANA_CHAIN_ID && <ClaimWinnings />}
        <Flex gap={16} vertical={!sm} wrap justify="center" align="center">
          <Typography.Title css={commonStyles.textMuted}>{t(TXT_ROUND_HISTORY)}</Typography.Title>
          <TransparentSelect value={network} onChange={onNetworkChange} options={networkItems} isCoin={false} />
          <TransparentSelect value={coin} onChange={onCoinChange} options={coinOptions} isCoin />
        </Flex>
      </Flex>
      <Flex gap={24} vertical={!sm} align="center" justify="center" css={commonStyles.fullWidth}>
        <Search requestSearch={search} setRequestSearch={setSearch} />
        {walletUiConnection.isConnected && (
          <HistorySwitch myRoundsOnly={myRoundsOnly} setMyRoundsOnly={setMyRoundsOnly} />
        )}
      </Flex>
      <HistoryTable
        data={roundsData}
        resetFilters={resetFilters}
        isLoading={loading || (!!data?.winStats.content.length && !roundsData.length)}
        loadMore={loadMoreHandler}
        canLoadMore={canLoadMore}
      />
    </Flex>
  );
};
