import React, { FC } from "react";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { useLeaderboardTable } from "pages/Leaderboard/components/LeaderboardTable/hooks/useLeaderboardTable";
import { LeaderboardMainContent } from "pages/Leaderboard/components/LeaderboardTable/LeaderboardMainContent";
import { SearchInput } from "pages/Leaderboard/components/LeaderboardTable/SearchInput";
import { leaderboardTableStyles as styles } from "pages/Leaderboard/components/LeaderboardTable/styles/leaderboardTableStyles";
import EmptyLeaderboardTable from "./EmptyLeaderboardTable";

type Props = {
  contractAddress: string;
  tokenAddress: string;
};

export const LeaderBoardTable: FC<Props> = ({ contractAddress, tokenAddress }) => {
  const { xs } = useBreakpoint();

  const {
    handleSearchChange,
    showEmptyPage,
    loading,
    currentPage,
    search,
    data,
    selfData,
    showSelf,
    selfStat,
    totalElements,
    changePageHandler,
    totalPages,
    noSearchResults,
    handleClearSearch,
  } = useLeaderboardTable({ contractAddress, tokenAddress });

  return (
    <div css={styles.root} style={xs ? { padding: 0, border: "none", gap: 0 } : { gap: 16 }}>
      {showEmptyPage ? (
        <EmptyLeaderboardTable contractAddress={contractAddress} tokenAddress={tokenAddress} />
      ) : (
        <>
          <SearchInput search={search} handleSearchChange={handleSearchChange} clearSearch={handleClearSearch} />
          <LeaderboardMainContent
            loading={loading}
            data={data}
            selfData={selfData}
            showSelf={!!showSelf}
            selfStat={selfStat}
            totalElements={totalElements}
            currentPage={currentPage}
            changePageHandler={changePageHandler}
            totalPages={totalPages}
            noSearchResults={noSearchResults}
            handleClearSearch={handleClearSearch}
          />
        </>
      )}
    </div>
  );
};
