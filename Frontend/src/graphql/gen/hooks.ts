
import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
import * as Types from "./types";

const defaultOptions = {} as const;

export const GetUserStatsDocument = gql`
  query GetUserStats(
    $walletAddress: String
    $contractAddress: String!
    $tokenAddress: String
    $limit: Int
    $offset: Int
  ) {
    userStats(
      walletAddress: $walletAddress
      contractAddress: $contractAddress
      tokenAddress: $tokenAddress
      limit: $limit
      offset: $offset
    ) {
      content {
        rank
        userAddress
        badges {
          hasCrownBadge
          hasDiamondBadge
          hasWhaleBadge
        }
        totalWins
        tickets
      }
      totalPages
      totalElements
    }
  }
`;

/**
 * __useGetUserStatsQuery__
 *
 * To run a query within a React component, call `useGetUserStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserStatsQuery({
 *   variables: {
 *      walletAddress: // value for 'walletAddress'
 *      contractAddress: // value for 'contractAddress'
 *      tokenAddress: // value for 'tokenAddress'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUserStatsQuery(
  baseOptions: Apollo.QueryHookOptions<Types.GetUserStatsQuery, Types.GetUserStatsQueryVariables> &
    ({ variables: Types.GetUserStatsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetUserStatsQuery, Types.GetUserStatsQueryVariables>(GetUserStatsDocument, options);
}
export function useGetUserStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.GetUserStatsQuery, Types.GetUserStatsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetUserStatsQuery, Types.GetUserStatsQueryVariables>(GetUserStatsDocument, options);
}
// @ts-expect-error duplicate
export function useGetUserStatsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<Types.GetUserStatsQuery, Types.GetUserStatsQueryVariables>,
): Apollo.UseSuspenseQueryResult<Types.GetUserStatsQuery, Types.GetUserStatsQueryVariables>;
export function useGetUserStatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetUserStatsQuery, Types.GetUserStatsQueryVariables>,
): Apollo.UseSuspenseQueryResult<Types.GetUserStatsQuery | undefined, Types.GetUserStatsQueryVariables>;
export function useGetUserStatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetUserStatsQuery, Types.GetUserStatsQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.GetUserStatsQuery, Types.GetUserStatsQueryVariables>(
    GetUserStatsDocument,
    options,
  );
}
export type GetUserStatsQueryHookResult = ReturnType<typeof useGetUserStatsQuery>;
export type GetUserStatsLazyQueryHookResult = ReturnType<typeof useGetUserStatsLazyQuery>;
export type GetUserStatsSuspenseQueryHookResult = ReturnType<typeof useGetUserStatsSuspenseQuery>;
export type GetUserStatsQueryResult = Apollo.QueryResult<Types.GetUserStatsQuery, Types.GetUserStatsQueryVariables>;
export const GetRoundHistoryStatsDocument = gql`
  query GetRoundHistoryStats(
    $walletAddress: String
    $contractAddress: String!
    $tokenAddress: String!
    $search: String
    $limit: Int!
    $offset: Int!
  ) {
    winStats(
      walletAddress: $walletAddress
      contractAddress: $contractAddress
      tokenAddress: $tokenAddress
      search: $search
      limit: $limit
      offset: $offset
    ) {
      content {
        id
        winner {
          address
          badges {
            hasCrownBadge
            hasDiamondBadge
            hasWhaleBadge
          }
        }
        token
        roundId
        ticketId
        contractAddress
        amount
        playersCount
        blockTimestamp
        transactionHash
        logIndex
        createdAt
        updatedAt
      }
      totalPages
      totalElements
    }
  }
`;

/**
 * __useGetRoundHistoryStatsQuery__
 *
 * To run a query within a React component, call `useGetRoundHistoryStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoundHistoryStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoundHistoryStatsQuery({
 *   variables: {
 *      walletAddress: // value for 'walletAddress'
 *      contractAddress: // value for 'contractAddress'
 *      tokenAddress: // value for 'tokenAddress'
 *      search: // value for 'search'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetRoundHistoryStatsQuery(
  baseOptions: Apollo.QueryHookOptions<Types.GetRoundHistoryStatsQuery, Types.GetRoundHistoryStatsQueryVariables> &
    ({ variables: Types.GetRoundHistoryStatsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetRoundHistoryStatsQuery, Types.GetRoundHistoryStatsQueryVariables>(
    GetRoundHistoryStatsDocument,
    options,
  );
}
export function useGetRoundHistoryStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.GetRoundHistoryStatsQuery, Types.GetRoundHistoryStatsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetRoundHistoryStatsQuery, Types.GetRoundHistoryStatsQueryVariables>(
    GetRoundHistoryStatsDocument,
    options,
  );
}
// @ts-expect-error duplicate
export function useGetRoundHistoryStatsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    Types.GetRoundHistoryStatsQuery,
    Types.GetRoundHistoryStatsQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<Types.GetRoundHistoryStatsQuery, Types.GetRoundHistoryStatsQueryVariables>;
export function useGetRoundHistoryStatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetRoundHistoryStatsQuery, Types.GetRoundHistoryStatsQueryVariables>,
): Apollo.UseSuspenseQueryResult<Types.GetRoundHistoryStatsQuery | undefined, Types.GetRoundHistoryStatsQueryVariables>;
export function useGetRoundHistoryStatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetRoundHistoryStatsQuery, Types.GetRoundHistoryStatsQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.GetRoundHistoryStatsQuery, Types.GetRoundHistoryStatsQueryVariables>(
    GetRoundHistoryStatsDocument,
    options,
  );
}
export type GetRoundHistoryStatsQueryHookResult = ReturnType<typeof useGetRoundHistoryStatsQuery>;
export type GetRoundHistoryStatsLazyQueryHookResult = ReturnType<typeof useGetRoundHistoryStatsLazyQuery>;
export type GetRoundHistoryStatsSuspenseQueryHookResult = ReturnType<typeof useGetRoundHistoryStatsSuspenseQuery>;
export type GetRoundHistoryStatsQueryResult = Apollo.QueryResult<
  Types.GetRoundHistoryStatsQuery,
  Types.GetRoundHistoryStatsQueryVariables
>;
export const GetUserDashboardStatsDocument = gql`
  query GetUserDashboardStats(
    $walletAddress: String
    $contractAddress: String!
    $tokenAddress: String
    $roundId: Int
    $limit: Int
    $offset: Int
  ) {
    userStats(
      walletAddress: $walletAddress
      contractAddress: $contractAddress
      tokenAddress: $tokenAddress
      roundId: $roundId
      limit: $limit
      offset: $offset
    ) {
      content {
        rank
        userAddress
        badges {
          hasCrownBadge
          hasDiamondBadge
          hasWhaleBadge
        }
        totalWins
        tickets
        tokenAddress
        contractAddress
        isWinner
      }
      totalPages
      totalElements
    }
  }
`;

/**
 * __useGetUserDashboardStatsQuery__
 *
 * To run a query within a React component, call `useGetUserDashboardStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDashboardStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDashboardStatsQuery({
 *   variables: {
 *      walletAddress: // value for 'walletAddress'
 *      contractAddress: // value for 'contractAddress'
 *      tokenAddress: // value for 'tokenAddress'
 *      roundId: // value for 'roundId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUserDashboardStatsQuery(
  baseOptions: Apollo.QueryHookOptions<Types.GetUserDashboardStatsQuery, Types.GetUserDashboardStatsQueryVariables> &
    ({ variables: Types.GetUserDashboardStatsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetUserDashboardStatsQuery, Types.GetUserDashboardStatsQueryVariables>(
    GetUserDashboardStatsDocument,
    options,
  );
}
export function useGetUserDashboardStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetUserDashboardStatsQuery,
    Types.GetUserDashboardStatsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetUserDashboardStatsQuery, Types.GetUserDashboardStatsQueryVariables>(
    GetUserDashboardStatsDocument,
    options,
  );
}
// @ts-expect-error duplicate
export function useGetUserDashboardStatsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    Types.GetUserDashboardStatsQuery,
    Types.GetUserDashboardStatsQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<Types.GetUserDashboardStatsQuery, Types.GetUserDashboardStatsQueryVariables>;
export function useGetUserDashboardStatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetUserDashboardStatsQuery, Types.GetUserDashboardStatsQueryVariables>,
): Apollo.UseSuspenseQueryResult<
  Types.GetUserDashboardStatsQuery | undefined,
  Types.GetUserDashboardStatsQueryVariables
>;
export function useGetUserDashboardStatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetUserDashboardStatsQuery, Types.GetUserDashboardStatsQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.GetUserDashboardStatsQuery, Types.GetUserDashboardStatsQueryVariables>(
    GetUserDashboardStatsDocument,
    options,
  );
}
export type GetUserDashboardStatsQueryHookResult = ReturnType<typeof useGetUserDashboardStatsQuery>;
export type GetUserDashboardStatsLazyQueryHookResult = ReturnType<typeof useGetUserDashboardStatsLazyQuery>;
export type GetUserDashboardStatsSuspenseQueryHookResult = ReturnType<typeof useGetUserDashboardStatsSuspenseQuery>;
export type GetUserDashboardStatsQueryResult = Apollo.QueryResult<
  Types.GetUserDashboardStatsQuery,
  Types.GetUserDashboardStatsQueryVariables
>;
export const GetUserTotalWinsDocument = gql`
  query GetUserTotalWins($walletAddress: String!) {
    userWins(address: $walletAddress) {
      totalWins
    }
  }
`;

/**
 * __useGetUserTotalWinsQuery__
 *
 * To run a query within a React component, call `useGetUserTotalWinsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTotalWinsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTotalWinsQuery({
 *   variables: {
 *      walletAddress: // value for 'walletAddress'
 *   },
 * });
 */
export function useGetUserTotalWinsQuery(
  baseOptions: Apollo.QueryHookOptions<Types.GetUserTotalWinsQuery, Types.GetUserTotalWinsQueryVariables> &
    ({ variables: Types.GetUserTotalWinsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetUserTotalWinsQuery, Types.GetUserTotalWinsQueryVariables>(
    GetUserTotalWinsDocument,
    options,
  );
}
export function useGetUserTotalWinsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.GetUserTotalWinsQuery, Types.GetUserTotalWinsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetUserTotalWinsQuery, Types.GetUserTotalWinsQueryVariables>(
    GetUserTotalWinsDocument,
    options,
  );
}
// @ts-expect-error duplicate
export function useGetUserTotalWinsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<Types.GetUserTotalWinsQuery, Types.GetUserTotalWinsQueryVariables>,
): Apollo.UseSuspenseQueryResult<Types.GetUserTotalWinsQuery, Types.GetUserTotalWinsQueryVariables>;
export function useGetUserTotalWinsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetUserTotalWinsQuery, Types.GetUserTotalWinsQueryVariables>,
): Apollo.UseSuspenseQueryResult<Types.GetUserTotalWinsQuery | undefined, Types.GetUserTotalWinsQueryVariables>;
export function useGetUserTotalWinsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetUserTotalWinsQuery, Types.GetUserTotalWinsQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.GetUserTotalWinsQuery, Types.GetUserTotalWinsQueryVariables>(
    GetUserTotalWinsDocument,
    options,
  );
}
export type GetUserTotalWinsQueryHookResult = ReturnType<typeof useGetUserTotalWinsQuery>;
export type GetUserTotalWinsLazyQueryHookResult = ReturnType<typeof useGetUserTotalWinsLazyQuery>;
export type GetUserTotalWinsSuspenseQueryHookResult = ReturnType<typeof useGetUserTotalWinsSuspenseQuery>;
export type GetUserTotalWinsQueryResult = Apollo.QueryResult<
  Types.GetUserTotalWinsQuery,
  Types.GetUserTotalWinsQueryVariables
>;
export const GetUserSelfStatsDocument = gql`
  query GetUserSelfStats($walletAddress: [String!]!, $contractAddress: String!, $tokenAddress: String, $roundId: Int) {
    selfStats(
      walletAddress: $walletAddress
      contractAddress: $contractAddress
      tokenAddress: $tokenAddress
      roundId: $roundId
    ) {
      rank
      userAddress
      contractAddress
      tokenAddress
      totalWins
      tickets
      isWinner
      badges {
        hasWhaleBadge
        hasDiamondBadge
        hasCrownBadge
      }
    }
  }
`;

/**
 * __useGetUserSelfStatsQuery__
 *
 * To run a query within a React component, call `useGetUserSelfStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSelfStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSelfStatsQuery({
 *   variables: {
 *      walletAddress: // value for 'walletAddress'
 *      contractAddress: // value for 'contractAddress'
 *      tokenAddress: // value for 'tokenAddress'
 *      roundId: // value for 'roundId'
 *   },
 * });
 */
export function useGetUserSelfStatsQuery(
  baseOptions: Apollo.QueryHookOptions<Types.GetUserSelfStatsQuery, Types.GetUserSelfStatsQueryVariables> &
    ({ variables: Types.GetUserSelfStatsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetUserSelfStatsQuery, Types.GetUserSelfStatsQueryVariables>(
    GetUserSelfStatsDocument,
    options,
  );
}
export function useGetUserSelfStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.GetUserSelfStatsQuery, Types.GetUserSelfStatsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetUserSelfStatsQuery, Types.GetUserSelfStatsQueryVariables>(
    GetUserSelfStatsDocument,
    options,
  );
}
// @ts-expect-error duplicate
export function useGetUserSelfStatsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<Types.GetUserSelfStatsQuery, Types.GetUserSelfStatsQueryVariables>,
): Apollo.UseSuspenseQueryResult<Types.GetUserSelfStatsQuery, Types.GetUserSelfStatsQueryVariables>;
export function useGetUserSelfStatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetUserSelfStatsQuery, Types.GetUserSelfStatsQueryVariables>,
): Apollo.UseSuspenseQueryResult<Types.GetUserSelfStatsQuery | undefined, Types.GetUserSelfStatsQueryVariables>;
export function useGetUserSelfStatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetUserSelfStatsQuery, Types.GetUserSelfStatsQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.GetUserSelfStatsQuery, Types.GetUserSelfStatsQueryVariables>(
    GetUserSelfStatsDocument,
    options,
  );
}
export type GetUserSelfStatsQueryHookResult = ReturnType<typeof useGetUserSelfStatsQuery>;
export type GetUserSelfStatsLazyQueryHookResult = ReturnType<typeof useGetUserSelfStatsLazyQuery>;
export type GetUserSelfStatsSuspenseQueryHookResult = ReturnType<typeof useGetUserSelfStatsSuspenseQuery>;
export type GetUserSelfStatsQueryResult = Apollo.QueryResult<
  Types.GetUserSelfStatsQuery,
  Types.GetUserSelfStatsQueryVariables
>;
export const GetUserNotificationsDocument = gql`
  query GetUserNotifications($userAddress: String!, $limit: Int, $offset: Int, $unreadOnly: Boolean) {
    notifications(userAddress: $userAddress, limit: $limit, offset: $offset, unreadOnly: $unreadOnly) {
      totalCount
      notifications {
        id
        createdAt
        updatedAt
        isRead
        isWinner
        winEvent {
          id
          winner {
            address
          }
          token
          roundId
          contractAddress
          amount
          blockTimestamp
          transactionHash
          logIndex
          createdAt
          updatedAt
        }
      }
    }
  }
`;

/**
 * __useGetUserNotificationsQuery__
 *
 * To run a query within a React component, call `useGetUserNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserNotificationsQuery({
 *   variables: {
 *      userAddress: // value for 'userAddress'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      unreadOnly: // value for 'unreadOnly'
 *   },
 * });
 */
export function useGetUserNotificationsQuery(
  baseOptions: Apollo.QueryHookOptions<Types.GetUserNotificationsQuery, Types.GetUserNotificationsQueryVariables> &
    ({ variables: Types.GetUserNotificationsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetUserNotificationsQuery, Types.GetUserNotificationsQueryVariables>(
    GetUserNotificationsDocument,
    options,
  );
}
export function useGetUserNotificationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.GetUserNotificationsQuery, Types.GetUserNotificationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetUserNotificationsQuery, Types.GetUserNotificationsQueryVariables>(
    GetUserNotificationsDocument,
    options,
  );
}
// @ts-expect-error duplicate
export function useGetUserNotificationsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    Types.GetUserNotificationsQuery,
    Types.GetUserNotificationsQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<Types.GetUserNotificationsQuery, Types.GetUserNotificationsQueryVariables>;
export function useGetUserNotificationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetUserNotificationsQuery, Types.GetUserNotificationsQueryVariables>,
): Apollo.UseSuspenseQueryResult<Types.GetUserNotificationsQuery | undefined, Types.GetUserNotificationsQueryVariables>;
export function useGetUserNotificationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetUserNotificationsQuery, Types.GetUserNotificationsQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.GetUserNotificationsQuery, Types.GetUserNotificationsQueryVariables>(
    GetUserNotificationsDocument,
    options,
  );
}
export type GetUserNotificationsQueryHookResult = ReturnType<typeof useGetUserNotificationsQuery>;
export type GetUserNotificationsLazyQueryHookResult = ReturnType<typeof useGetUserNotificationsLazyQuery>;
export type GetUserNotificationsSuspenseQueryHookResult = ReturnType<typeof useGetUserNotificationsSuspenseQuery>;
export type GetUserNotificationsQueryResult = Apollo.QueryResult<
  Types.GetUserNotificationsQuery,
  Types.GetUserNotificationsQueryVariables
>;
export const MarkNotificationAsReadDocument = gql`
  mutation MarkNotificationAsRead($notificationId: ID!, $userAddress: String!) {
    markNotificationAsRead(notificationId: $notificationId, userAddress: $userAddress)
  }
`;
export type MarkNotificationAsReadMutationFn = Apollo.MutationFunction<
  Types.MarkNotificationAsReadMutation,
  Types.MarkNotificationAsReadMutationVariables
>;

/**
 * __useMarkNotificationAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationAsReadMutation, { data, loading, error }] = useMarkNotificationAsReadMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *      userAddress: // value for 'userAddress'
 *   },
 * });
 */
export function useMarkNotificationAsReadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.MarkNotificationAsReadMutation,
    Types.MarkNotificationAsReadMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.MarkNotificationAsReadMutation, Types.MarkNotificationAsReadMutationVariables>(
    MarkNotificationAsReadDocument,
    options,
  );
}
export type MarkNotificationAsReadMutationHookResult = ReturnType<typeof useMarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationResult = Apollo.MutationResult<Types.MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = Apollo.BaseMutationOptions<
  Types.MarkNotificationAsReadMutation,
  Types.MarkNotificationAsReadMutationVariables
>;
export const GetUnclaimedPrizesDocument = gql`
  query GetUnclaimedPrizes($winnerAddress: String!, $contractAddress: String!) {
    unclaimedPrizes(winnerAddress: $winnerAddress, contractAddress: $contractAddress) {
      totalPrizeAmount
      rounds
    }
  }
`;

/**
 * __useGetUnclaimedPrizesQuery__
 *
 * To run a query within a React component, call `useGetUnclaimedPrizesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnclaimedPrizesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnclaimedPrizesQuery({
 *   variables: {
 *      winnerAddress: // value for 'winnerAddress'
 *      contractAddress: // value for 'contractAddress'
 *   },
 * });
 */
export function useGetUnclaimedPrizesQuery(
  baseOptions: Apollo.QueryHookOptions<Types.GetUnclaimedPrizesQuery, Types.GetUnclaimedPrizesQueryVariables> &
    ({ variables: Types.GetUnclaimedPrizesQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetUnclaimedPrizesQuery, Types.GetUnclaimedPrizesQueryVariables>(
    GetUnclaimedPrizesDocument,
    options,
  );
}
export function useGetUnclaimedPrizesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.GetUnclaimedPrizesQuery, Types.GetUnclaimedPrizesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetUnclaimedPrizesQuery, Types.GetUnclaimedPrizesQueryVariables>(
    GetUnclaimedPrizesDocument,
    options,
  );
}
// @ts-expect-error duplicate
export function useGetUnclaimedPrizesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<Types.GetUnclaimedPrizesQuery, Types.GetUnclaimedPrizesQueryVariables>,
): Apollo.UseSuspenseQueryResult<Types.GetUnclaimedPrizesQuery, Types.GetUnclaimedPrizesQueryVariables>;
export function useGetUnclaimedPrizesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetUnclaimedPrizesQuery, Types.GetUnclaimedPrizesQueryVariables>,
): Apollo.UseSuspenseQueryResult<Types.GetUnclaimedPrizesQuery | undefined, Types.GetUnclaimedPrizesQueryVariables>;
export function useGetUnclaimedPrizesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetUnclaimedPrizesQuery, Types.GetUnclaimedPrizesQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.GetUnclaimedPrizesQuery, Types.GetUnclaimedPrizesQueryVariables>(
    GetUnclaimedPrizesDocument,
    options,
  );
}
export type GetUnclaimedPrizesQueryHookResult = ReturnType<typeof useGetUnclaimedPrizesQuery>;
export type GetUnclaimedPrizesLazyQueryHookResult = ReturnType<typeof useGetUnclaimedPrizesLazyQuery>;
export type GetUnclaimedPrizesSuspenseQueryHookResult = ReturnType<typeof useGetUnclaimedPrizesSuspenseQuery>;
export type GetUnclaimedPrizesQueryResult = Apollo.QueryResult<
  Types.GetUnclaimedPrizesQuery,
  Types.GetUnclaimedPrizesQueryVariables
>;
export const GetRoundPlayersDocument = gql`
  query GetRoundPlayers($roundId: Int!, $contractAddress: String!, $tokenAddress: String) {
    roundPlayers(roundId: $roundId, contractAddress: $contractAddress, tokenAddress: $tokenAddress) {
      id
      address
      createdAt
      updatedAt
      hasBonusTicket
      totalTickets
    }
  }
`;

/**
 * __useGetRoundPlayersQuery__
 *
 * To run a query within a React component, call `useGetRoundPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoundPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoundPlayersQuery({
 *   variables: {
 *      roundId: // value for 'roundId'
 *      contractAddress: // value for 'contractAddress'
 *      tokenAddress: // value for 'tokenAddress'
 *   },
 * });
 */
export function useGetRoundPlayersQuery(
  baseOptions: Apollo.QueryHookOptions<Types.GetRoundPlayersQuery, Types.GetRoundPlayersQueryVariables> &
    ({ variables: Types.GetRoundPlayersQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetRoundPlayersQuery, Types.GetRoundPlayersQueryVariables>(
    GetRoundPlayersDocument,
    options,
  );
}
export function useGetRoundPlayersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.GetRoundPlayersQuery, Types.GetRoundPlayersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetRoundPlayersQuery, Types.GetRoundPlayersQueryVariables>(
    GetRoundPlayersDocument,
    options,
  );
}
// @ts-expect-error duplicate
export function useGetRoundPlayersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<Types.GetRoundPlayersQuery, Types.GetRoundPlayersQueryVariables>,
): Apollo.UseSuspenseQueryResult<Types.GetRoundPlayersQuery, Types.GetRoundPlayersQueryVariables>;
export function useGetRoundPlayersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetRoundPlayersQuery, Types.GetRoundPlayersQueryVariables>,
): Apollo.UseSuspenseQueryResult<Types.GetRoundPlayersQuery | undefined, Types.GetRoundPlayersQueryVariables>;
export function useGetRoundPlayersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetRoundPlayersQuery, Types.GetRoundPlayersQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.GetRoundPlayersQuery, Types.GetRoundPlayersQueryVariables>(
    GetRoundPlayersDocument,
    options,
  );
}
export type GetRoundPlayersQueryHookResult = ReturnType<typeof useGetRoundPlayersQuery>;
export type GetRoundPlayersLazyQueryHookResult = ReturnType<typeof useGetRoundPlayersLazyQuery>;
export type GetRoundPlayersSuspenseQueryHookResult = ReturnType<typeof useGetRoundPlayersSuspenseQuery>;
export type GetRoundPlayersQueryResult = Apollo.QueryResult<
  Types.GetRoundPlayersQuery,
  Types.GetRoundPlayersQueryVariables
>;
export const GetServerTimeDocument = gql`
  query GetServerTime {
    serverTime {
      iso
      timestamp
    }
  }
`;

/**
 * __useGetServerTimeQuery__
 *
 * To run a query within a React component, call `useGetServerTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServerTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServerTimeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServerTimeQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.GetServerTimeQuery, Types.GetServerTimeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.GetServerTimeQuery, Types.GetServerTimeQueryVariables>(GetServerTimeDocument, options);
}
export function useGetServerTimeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.GetServerTimeQuery, Types.GetServerTimeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.GetServerTimeQuery, Types.GetServerTimeQueryVariables>(
    GetServerTimeDocument,
    options,
  );
}
// @ts-expect-error duplicate
export function useGetServerTimeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<Types.GetServerTimeQuery, Types.GetServerTimeQueryVariables>,
): Apollo.UseSuspenseQueryResult<Types.GetServerTimeQuery, Types.GetServerTimeQueryVariables>;
export function useGetServerTimeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetServerTimeQuery, Types.GetServerTimeQueryVariables>,
): Apollo.UseSuspenseQueryResult<Types.GetServerTimeQuery | undefined, Types.GetServerTimeQueryVariables>;
export function useGetServerTimeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<Types.GetServerTimeQuery, Types.GetServerTimeQueryVariables>,
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.GetServerTimeQuery, Types.GetServerTimeQueryVariables>(
    GetServerTimeDocument,
    options,
  );
}
export type GetServerTimeQueryHookResult = ReturnType<typeof useGetServerTimeQuery>;
export type GetServerTimeLazyQueryHookResult = ReturnType<typeof useGetServerTimeLazyQuery>;
export type GetServerTimeSuspenseQueryHookResult = ReturnType<typeof useGetServerTimeSuspenseQuery>;
export type GetServerTimeQueryResult = Apollo.QueryResult<Types.GetServerTimeQuery, Types.GetServerTimeQueryVariables>;
export const UpdatePriceFeedsDocument = gql`
  mutation UpdatePriceFeeds {
    updatePriceFeeds {
      success
      results {
        success
        error
        feedName
        signature
      }
    }
  }
`;
export type UpdatePriceFeedsMutationFn = Apollo.MutationFunction<
  Types.UpdatePriceFeedsMutation,
  Types.UpdatePriceFeedsMutationVariables
>;

/**
 * __useUpdatePriceFeedsMutation__
 *
 * To run a mutation, you first call `useUpdatePriceFeedsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePriceFeedsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePriceFeedsMutation, { data, loading, error }] = useUpdatePriceFeedsMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdatePriceFeedsMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.UpdatePriceFeedsMutation, Types.UpdatePriceFeedsMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.UpdatePriceFeedsMutation, Types.UpdatePriceFeedsMutationVariables>(
    UpdatePriceFeedsDocument,
    options,
  );
}
export type UpdatePriceFeedsMutationHookResult = ReturnType<typeof useUpdatePriceFeedsMutation>;
export type UpdatePriceFeedsMutationResult = Apollo.MutationResult<Types.UpdatePriceFeedsMutation>;
export type UpdatePriceFeedsMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdatePriceFeedsMutation,
  Types.UpdatePriceFeedsMutationVariables
>;
