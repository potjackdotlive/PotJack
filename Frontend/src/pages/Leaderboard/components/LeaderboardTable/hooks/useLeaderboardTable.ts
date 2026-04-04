import React, { useEffect, useMemo, useState } from "react";
import { useGetUserSelfStatsQuery, useGetUserStatsQuery } from "graphql/gen/hooks";
import { UserStats } from "graphql/gen/types";
import { useDebounce } from "hooks/useDebounce";
import { useWalletConnection } from "hooks/useWalletConnection";
import { LEADERS_LIMIT, LEADERS_POLL_INTERVAL, TOP_LEADERS_LIMIT } from "pages/Leaderboard/utils";

type UseLeaderboardTableProps = {
  contractAddress: string;
  tokenAddress: string;
};

export const useLeaderboardTable = ({ contractAddress, tokenAddress }: UseLeaderboardTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const { debouncedValue } = useDebounce(search);
  const { address } = useWalletConnection();

  const { data: leadersData, loading } = useGetUserStatsQuery({
    variables: {
      contractAddress,
      tokenAddress,
      limit: LEADERS_LIMIT + 1,
      walletAddress: String(debouncedValue),
    },
    fetchPolicy: "no-cache",
    pollInterval: LEADERS_POLL_INTERVAL,
    skip: !contractAddress || !tokenAddress,
  });

  const { data: selfData } = useGetUserSelfStatsQuery({
    variables: {
      contractAddress,
      tokenAddress,
      walletAddress: [address as string],
    },
    pollInterval: LEADERS_POLL_INTERVAL,
    skip: !contractAddress || !tokenAddress || !address,
  });

  const selfStat = selfData?.selfStats?.length ? selfData.selfStats[0] : null;

  const { content: leaders = [], totalPages = 0, totalElements = 0 } = leadersData?.userStats || {};

  const data: Omit<UserStats, "contractAddress" | "roundId" | "tokenAddress">[] = useMemo(
    () => (leaders.length > TOP_LEADERS_LIMIT ? leaders?.slice(TOP_LEADERS_LIMIT) : leaders),
    [leaders, leadersData?.userStats?.totalElements],
  );

  const showSelf = useMemo(
    () =>
      selfStat?.rank &&
      selfStat?.rank > TOP_LEADERS_LIMIT &&
      !!data.length &&
      !data?.find((item) => item.userAddress === selfStat?.userAddress),
    [data, selfStat],
  );

  const changePageHandler = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const isLeadersDataEmpty = leadersData && !leadersData?.userStats?.content.length && !loading;

  const showEmptyPage = !debouncedValue && isLeadersDataEmpty;
  const noSearchResults = !!debouncedValue && isLeadersDataEmpty;

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedValue]);

  return {
    handleSearchChange,
    showEmptyPage,
    loading,
    data,
    currentPage,
    search,
    selfData,
    showSelf,
    selfStat,
    totalElements,
    noSearchResults,
    changePageHandler,
    handleClearSearch,
    totalPages,
  };
};
