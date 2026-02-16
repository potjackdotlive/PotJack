export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Badges = {
  __typename?: 'Badges';
  hasCrownBadge: Scalars['Boolean']['output'];
  hasDiamondBadge: Scalars['Boolean']['output'];
  hasWhaleBadge: Scalars['Boolean']['output'];
};

export type BlockchainConnectionStatus = {
  __typename?: 'BlockchainConnectionStatus';
  blockchainName: Scalars['String']['output'];
  isConnected: Scalars['Boolean']['output'];
  reconnectAttempts: Scalars['Int']['output'];
};

export type BlockchainConnectionStatusResponse = {
  __typename?: 'BlockchainConnectionStatusResponse';
  connections: Array<BlockchainConnectionStatus>;
  healthyConnections: Scalars['Int']['output'];
  totalConnections: Scalars['Int']['output'];
};

export type FeedUpdateResult = {
  __typename?: 'FeedUpdateResult';
  error?: Maybe<Scalars['String']['output']>;
  feedName: Scalars['String']['output'];
  signature?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  forceReconnectBlockchain: Scalars['Boolean']['output'];
  markAllNotificationsAsRead: Scalars['Int']['output'];
  markNotificationAsRead: Scalars['Boolean']['output'];
  updatePriceFeeds: UpdateFeedsResponse;
};


export type MutationForceReconnectBlockchainArgs = {
  blockchainName: Scalars['String']['input'];
};


export type MutationMarkAllNotificationsAsReadArgs = {
  userAddress: Scalars['String']['input'];
};


export type MutationMarkNotificationAsReadArgs = {
  notificationId: Scalars['ID']['input'];
  userAddress: Scalars['String']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  isWinner: Scalars['Boolean']['output'];
  updatedAt: Scalars['String']['output'];
  winEvent: WinEvent;
};

export type NotificationsResponse = {
  __typename?: 'NotificationsResponse';
  notifications: Array<Notification>;
  totalCount: Scalars['Int']['output'];
  unreadCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  blockchainConnectionStatus: BlockchainConnectionStatusResponse;
  notifications: NotificationsResponse;
  roundPlayers: Array<RoundPlayer>;
  selfStats: Array<SelfStats>;
  serverTime: ServerTime;
  unclaimedPrizes?: Maybe<UnclaimedPrizes>;
  user?: Maybe<User>;
  userStats: UserStatsResponse;
  userWins?: Maybe<UserWins>;
  winStats: WinStats;
};


export type QueryNotificationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  unreadOnly?: InputMaybe<Scalars['Boolean']['input']>;
  userAddress: Scalars['String']['input'];
};


export type QueryRoundPlayersArgs = {
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  roundId?: InputMaybe<Scalars['Int']['input']>;
  tokenAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySelfStatsArgs = {
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  roundId?: InputMaybe<Scalars['Int']['input']>;
  tokenAddress?: InputMaybe<Scalars['String']['input']>;
  walletAddress: Array<Scalars['String']['input']>;
};


export type QueryUnclaimedPrizesArgs = {
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  winnerAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  address: Scalars['String']['input'];
};


export type QueryUserStatsArgs = {
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  roundId?: InputMaybe<Scalars['Int']['input']>;
  tokenAddress?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserWinsArgs = {
  address: Scalars['String']['input'];
};


export type QueryWinStatsArgs = {
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  tokenAddress?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

export type RoundPlayer = {
  __typename?: 'RoundPlayer';
  address: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  hasBonusTicket: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  totalTickets: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};


export type RoundPlayerHasBonusTicketArgs = {
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  roundId?: InputMaybe<Scalars['Int']['input']>;
  tokenAddress?: InputMaybe<Scalars['String']['input']>;
};


export type RoundPlayerTotalTicketsArgs = {
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  roundId?: InputMaybe<Scalars['Int']['input']>;
  tokenAddress?: InputMaybe<Scalars['String']['input']>;
};

export type SelfStats = {
  __typename?: 'SelfStats';
  badges: Badges;
  contractAddress?: Maybe<Scalars['String']['output']>;
  isWinner?: Maybe<Scalars['Boolean']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  roundId?: Maybe<Scalars['Int']['output']>;
  tickets: Scalars['Int']['output'];
  tokenAddress?: Maybe<Scalars['String']['output']>;
  totalWins: Scalars['Int']['output'];
  userAddress: Scalars['String']['output'];
};

export type ServerTime = {
  __typename?: 'ServerTime';
  iso: Scalars['String']['output'];
  timestamp: Scalars['Float']['output'];
};

export type UnclaimedPrizes = {
  __typename?: 'UnclaimedPrizes';
  rounds: Array<Scalars['Int']['output']>;
  totalPrizeAmount: Scalars['String']['output'];
};

export type UpdateFeedsResponse = {
  __typename?: 'UpdateFeedsResponse';
  results: Array<FeedUpdateResult>;
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  totalTickets: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type UserStats = {
  __typename?: 'UserStats';
  badges: Badges;
  contractAddress: Scalars['String']['output'];
  isWinner?: Maybe<Scalars['Boolean']['output']>;
  rank: Scalars['Int']['output'];
  roundId: Scalars['Int']['output'];
  tickets: Scalars['Int']['output'];
  tokenAddress: Scalars['String']['output'];
  totalWins: Scalars['Int']['output'];
  userAddress: Scalars['String']['output'];
};

export type UserStatsResponse = {
  __typename?: 'UserStatsResponse';
  content: Array<UserStats>;
  totalElements: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type UserWins = {
  __typename?: 'UserWins';
  totalWins: Scalars['Int']['output'];
};

export type WinEvent = {
  __typename?: 'WinEvent';
  amount: Scalars['String']['output'];
  blockTimestamp: Scalars['String']['output'];
  contractAddress: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['Int']['output'];
  playersCount: Scalars['Int']['output'];
  roundId: Scalars['Int']['output'];
  ticketId: Scalars['String']['output'];
  token: Scalars['String']['output'];
  transactionHash: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  winner: Winner;
};

export type WinStats = {
  __typename?: 'WinStats';
  content: Array<WinEvent>;
  totalElements: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Winner = {
  __typename?: 'Winner';
  address: Scalars['String']['output'];
  badges: Badges;
};

export type GetUserStatsQueryVariables = Exact<{
  walletAddress?: InputMaybe<Scalars['String']['input']>;
  contractAddress: Scalars['String']['input'];
  tokenAddress?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUserStatsQuery = { __typename?: 'Query', userStats: { __typename?: 'UserStatsResponse', totalPages: number, totalElements: number, content: Array<{ __typename?: 'UserStats', rank: number, userAddress: string, totalWins: number, tickets: number, badges: { __typename?: 'Badges', hasCrownBadge: boolean, hasDiamondBadge: boolean, hasWhaleBadge: boolean } }> } };

export type GetRoundHistoryStatsQueryVariables = Exact<{
  walletAddress?: InputMaybe<Scalars['String']['input']>;
  contractAddress: Scalars['String']['input'];
  tokenAddress: Scalars['String']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetRoundHistoryStatsQuery = { __typename?: 'Query', winStats: { __typename?: 'WinStats', totalPages: number, totalElements: number, content: Array<{ __typename?: 'WinEvent', id: string, token: string, roundId: number, ticketId: string, contractAddress: string, amount: string, playersCount: number, blockTimestamp: string, transactionHash: string, logIndex: number, createdAt: string, updatedAt: string, winner: { __typename?: 'Winner', address: string, badges: { __typename?: 'Badges', hasCrownBadge: boolean, hasDiamondBadge: boolean, hasWhaleBadge: boolean } } }> } };

export type GetUserDashboardStatsQueryVariables = Exact<{
  walletAddress?: InputMaybe<Scalars['String']['input']>;
  contractAddress: Scalars['String']['input'];
  tokenAddress?: InputMaybe<Scalars['String']['input']>;
  roundId?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUserDashboardStatsQuery = { __typename?: 'Query', userStats: { __typename?: 'UserStatsResponse', totalPages: number, totalElements: number, content: Array<{ __typename?: 'UserStats', rank: number, userAddress: string, totalWins: number, tickets: number, tokenAddress: string, contractAddress: string, isWinner?: boolean | null, badges: { __typename?: 'Badges', hasCrownBadge: boolean, hasDiamondBadge: boolean, hasWhaleBadge: boolean } }> } };

export type GetUserTotalWinsQueryVariables = Exact<{
  walletAddress: Scalars['String']['input'];
}>;


export type GetUserTotalWinsQuery = { __typename?: 'Query', userWins?: { __typename?: 'UserWins', totalWins: number } | null };

export type GetUserSelfStatsQueryVariables = Exact<{
  walletAddress: Array<Scalars['String']['input']> | Scalars['String']['input'];
  contractAddress: Scalars['String']['input'];
  tokenAddress?: InputMaybe<Scalars['String']['input']>;
  roundId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUserSelfStatsQuery = { __typename?: 'Query', selfStats: Array<{ __typename?: 'SelfStats', rank?: number | null, userAddress: string, contractAddress?: string | null, tokenAddress?: string | null, totalWins: number, tickets: number, isWinner?: boolean | null, badges: { __typename?: 'Badges', hasWhaleBadge: boolean, hasDiamondBadge: boolean, hasCrownBadge: boolean } }> };

export type GetUserNotificationsQueryVariables = Exact<{
  userAddress: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  unreadOnly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetUserNotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationsResponse', totalCount: number, notifications: Array<{ __typename?: 'Notification', id: string, createdAt: string, updatedAt: string, isRead: boolean, isWinner: boolean, winEvent: { __typename?: 'WinEvent', id: string, token: string, roundId: number, contractAddress: string, amount: string, blockTimestamp: string, transactionHash: string, logIndex: number, createdAt: string, updatedAt: string, winner: { __typename?: 'Winner', address: string } } }> } };

export type MarkNotificationAsReadMutationVariables = Exact<{
  notificationId: Scalars['ID']['input'];
  userAddress: Scalars['String']['input'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: boolean };

export type GetUnclaimedPrizesQueryVariables = Exact<{
  winnerAddress: Scalars['String']['input'];
  contractAddress: Scalars['String']['input'];
}>;


export type GetUnclaimedPrizesQuery = { __typename?: 'Query', unclaimedPrizes?: { __typename?: 'UnclaimedPrizes', totalPrizeAmount: string, rounds: Array<number> } | null };

export type GetRoundPlayersQueryVariables = Exact<{
  roundId: Scalars['Int']['input'];
  contractAddress: Scalars['String']['input'];
  tokenAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetRoundPlayersQuery = { __typename?: 'Query', roundPlayers: Array<{ __typename?: 'RoundPlayer', id: string, address: string, createdAt: string, updatedAt: string, hasBonusTicket: boolean, totalTickets: number }> };

export type GetServerTimeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServerTimeQuery = { __typename?: 'Query', serverTime: { __typename?: 'ServerTime', iso: string, timestamp: number } };

export type UpdatePriceFeedsMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdatePriceFeedsMutation = { __typename?: 'Mutation', updatePriceFeeds: { __typename?: 'UpdateFeedsResponse', success: boolean, results: Array<{ __typename?: 'FeedUpdateResult', success: boolean, error?: string | null, feedName: string, signature?: string | null }> } };
