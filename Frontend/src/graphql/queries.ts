import { gql } from "@apollo/client";

export const GET_USER_STATS = gql`
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

export const GET_ROUND_HISTORY_STATS = gql`
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

export const GET_USER_DASHBOARD_STATS = gql`
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

export const GET_USER_TOTAL_WINS = gql`
  query GetUserTotalWins($walletAddress: String!) {
    userWins(address: $walletAddress) {
      totalWins
    }
  }
`;

export const GET_USER_SELF_STATS = gql`
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

export const GET_USER_NOTIFICATIONS = gql`
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

export const MARK_NOTIFICATION_AS_READ = gql`
  mutation MarkNotificationAsRead($notificationId: ID!, $userAddress: String!) {
    markNotificationAsRead(notificationId: $notificationId, userAddress: $userAddress)
  }
`;

export const GET_UNCLAIMED_PRIZES = gql`
  query GetUnclaimedPrizes($winnerAddress: String!, $contractAddress: String!) {
    unclaimedPrizes(winnerAddress: $winnerAddress, contractAddress: $contractAddress) {
      totalPrizeAmount
      rounds
    }
  }
`;

export const GET_ROUND_PLAYERS = gql`
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

export const GET_SERVER_TIME = gql`
  query GetServerTime {
    serverTime {
      iso
      timestamp
    }
  }
`;

export const UPDATE_PRICE_FEEDS = gql`
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
