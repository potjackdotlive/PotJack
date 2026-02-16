import { useEffect, useState } from "react";
import { useGetUserDashboardStatsQuery, useGetUserSelfStatsQuery } from "graphql/gen/hooks";
import { GetUserDashboardStatsQuery, GetUserSelfStatsQuery, Maybe } from "graphql/gen/types";
import { useApolloErrorHandler } from "hooks/useApolloErrorHandler";
import { useWalletConnection } from "hooks/useWalletConnection";
import { LEADERS_POLL_INTERVAL } from "pages/Leaderboard/utils";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { DASHBOARD_LEADERS_LIMIT } from "pages/Play/utils";
import { getContractAddressByChain } from "utils/getContractAddressByChain";
import { getTokenAddress } from "utils/getTokenAddress";
import { ChainIdType } from "utils/types";

export const usePlayersBlock = () => {
  const { address } = useWalletConnection();
  const { coin, roundId, networkId, maxRoundForCoin } = usePlayContext();
  const chainId = (networkId as ChainIdType) || null;
  const [currentPage, setCurrentPage] = useState(1);
  const [leadersData, setLeadersData] = useState<Maybe<GetUserDashboardStatsQuery>>(null);
  const [selfData, setSelfData] = useState<Maybe<GetUserSelfStatsQuery>>(null);

  const tokenAddress = getTokenAddress({ chainId: networkId as ChainIdType, coin });

  const showParticipants = networkId && coin;
  const contractAddress = getContractAddressByChain(networkId);

  const {
    data: selfQueryData,
    loading: isSelfDataLoading,
    error: selfError,
  } = useGetUserSelfStatsQuery({
    variables: {
      contractAddress,
      roundId: coin && (roundId !== null && roundId !== undefined ? roundId : undefined),
      tokenAddress: coin && tokenAddress ? tokenAddress : undefined,
      walletAddress: address ? [address as string] : [],
    },
    pollInterval: LEADERS_POLL_INTERVAL,
  });

  const { data, fetchMore, loading, error } = useGetUserDashboardStatsQuery({
    variables: {
      contractAddress,
      roundId: coin && (roundId !== null && roundId !== undefined ? roundId : undefined),
      tokenAddress: coin && tokenAddress ? tokenAddress : undefined,
      limit: DASHBOARD_LEADERS_LIMIT,
      offset: 0,
    },
    fetchPolicy: "no-cache",
    pollInterval: LEADERS_POLL_INTERVAL,
  });

  const loadMoreParticipants = () => {
    setCurrentPage((prev) => prev + 1);

    fetchMore({
      variables: {
        contractAddress,
        roundId: coin && (roundId !== null && roundId !== undefined ? roundId : undefined),
        tokenAddress: coin && tokenAddress ? tokenAddress : undefined,
        limit: DASHBOARD_LEADERS_LIMIT,
        offset: currentPage * DASHBOARD_LEADERS_LIMIT,
      },
    }).then((data) => {
      setLeadersData((prev) => ({
        ...prev,
        userStats: {
          totalPages: data.data.userStats?.totalPages || prev?.userStats?.totalPages || 0,
          totalElements: data.data.userStats?.totalElements || prev?.userStats?.totalElements || 0,
          content: [...(prev?.userStats?.content || []), ...(data?.data?.userStats?.content || [])],
        },
      }));
    });
  };

  const showRaffleNotStarted =
    coin && roundId === maxRoundForCoin && (leadersData?.userStats?.totalElements === 0 || !leadersData);

  useApolloErrorHandler(error);
  useApolloErrorHandler(selfError);

  useEffect(() => {
    setLeadersData(data || null);
  }, [data]);

  useEffect(() => {
    setSelfData(selfQueryData || null);
  }, [selfQueryData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [coin, roundId, networkId]);

  return {
    loadMoreParticipants,
    leadersData,
    selfData,
    isSelfDataLoading,
    loading,
    maxRoundForCoin,
    showParticipants,
    currentPage,
    coin,
    showRaffleNotStarted,
    chainId,
  };
};
