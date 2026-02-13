import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { BlockchainService } from '../services/blockchain/BlockchainService';
import { NotificationService } from '../services/notifications/NotificationService';
import { StatisticsService } from '../services/statistics/StatisticsService';
import { SwitchboardService } from '../services/prices/SwitchboardService';
import {FirstTicketBonus} from "../entities/FirstTicketBonus";
import {TicketPurchase} from "../entities/TicketPurchase";

let statisticsService: StatisticsService | null = null;
const notificationService = new NotificationService();

// Get or create StatisticsService instance
const getStatisticsService = () => {
  if (!statisticsService) {
    statisticsService = new StatisticsService();
  }
  return statisticsService;
};

// Interface for blockchain connection status
interface BlockchainConnectionStatus {
  isConnected: boolean;
  reconnectAttempts: number;
}

// Global blockchain service instance - will be set from index.ts
let blockchainService: BlockchainService | null = null;

export const setBlockchainService = (service: BlockchainService) => {
  blockchainService = service;
};

// Global switchboard service instance - will be set from index.ts
let switchboardService: SwitchboardService | null = null;

export const setSwitchboardService = (service: SwitchboardService) => {
  switchboardService = service;
};

// noinspection JSUnusedGlobalSymbols
export const resolvers = {
  Query: {
    serverTime: () => {
      const now = Date.now();
      return {
        timestamp: now,
        iso: new Date(now).toISOString()
      };
    },

    // Get a user by address
    user: async (_: unknown, { address }: { address: string }) =>
      await AppDataSource.getRepository(User).findOne({
        where: { address },
      }),

    userWins: async (_: unknown, { address }: { address: string }) => {
      const result = await getStatisticsService().getUserWins(address);

      return { totalWins: result };
    },

    // Get win statistics with optional filtering
    winStats: async (
      _: unknown,
      {
        walletAddress,
        contractAddress,
        tokenAddress,
        search,
        limit = 10,
        offset = 0,
      }: {
        walletAddress?: string;
        contractAddress?: string;
        tokenAddress?: string;
        search?: string;
        limit?: number;
        offset?: number;
      },
    ) => {
      return getStatisticsService().getWinStatistics(
        walletAddress,
        contractAddress,
        tokenAddress,
        search,
        limit,
        offset,
      );
    },

    // Get user statistics with badge information
    userStats: async (
      _: unknown,
      {
        walletAddress,
        contractAddress,
        tokenAddress,
        roundId,
        limit = 10,
        offset = 0,
      }: {
        walletAddress?: string;
        contractAddress?: string;
        tokenAddress?: string;
        roundId?: number;
        limit?: number;
        offset?: number;
      },
    ) => {
      return getStatisticsService().getUserStatistics(
        walletAddress,
        contractAddress,
        tokenAddress,
        roundId,
        limit,
        offset,
      );
    },

    selfStats: async (
      _: unknown,
      {
        walletAddress,
        contractAddress,
        tokenAddress,
        roundId,
      }: {
        walletAddress: string[];
        contractAddress?: string;
        tokenAddress?: string;
        roundId?: number;
      },
    ) => {
      return getStatisticsService().getSelfStatistics(
        walletAddress,
        contractAddress,
        tokenAddress,
        roundId,
      );
    },

    roundPlayers: async (
      _: unknown,
      { contractAddress, tokenAddress, roundId }: {
        contractAddress: string;
        tokenAddress: string;
        roundId: number;
      },
      context: any
    ) => {
      context.roundParams = { contractAddress, tokenAddress, roundId };

      return getStatisticsService().getRoundPlayers(
        contractAddress,
        tokenAddress,
        roundId,
      );
    },

    notifications: (
      _: unknown,
      {
        userAddress,
        limit = 20,
        offset = 0,
        unreadOnly = false,
      }: {
        userAddress: string;
        limit?: number;
        offset?: number;
        unreadOnly?: boolean;
      },
    ) => {
      return notificationService.getUserNotifications(userAddress, limit, offset, unreadOnly);
    },

    // Get blockchain connection status
    blockchainConnectionStatus: () => {
      if (!blockchainService) {
        return {
          connections: [],
          totalConnections: 0,
          healthyConnections: 0,
        };
      }

      const status = blockchainService.getConnectionStatus() as Record<string, BlockchainConnectionStatus>;
      const connections = Object.entries(status).map(([blockchainName, connectionStatus]) => ({
        blockchainName,
        isConnected: connectionStatus.isConnected,
        reconnectAttempts: connectionStatus.reconnectAttempts,
      }));

      const healthyConnections = connections.filter(conn => conn.isConnected).length;

      return {
        connections,
        totalConnections: connections.length,
        healthyConnections,
      };
    },

    unclaimedPrizes: async (
      _: unknown,
      {
        winnerAddress,
        contractAddress,
      }: {
        winnerAddress: string;
        contractAddress: string;
      },
    ) => {
      return getStatisticsService().getUnclaimedPrizes(
        winnerAddress,
        contractAddress,
      );
    },
  },

  Mutation: {
    markNotificationAsRead: (
      _: unknown,
      {
        notificationId,
        userAddress,
      }: {
        notificationId: string;
        userAddress: string;
      },
    ) => {
      return notificationService.markAsRead(notificationId, userAddress);
    },

    markAllNotificationsAsRead: (_: unknown, { userAddress }: { userAddress: string }) => {
      return notificationService.markAllAsRead(userAddress);
    },

    // Force reconnection to a blockchain
    forceReconnectBlockchain: async (_: unknown, { blockchainName }: { blockchainName: string }) => {
      if (!blockchainService) {
        return false;
      }

      return await blockchainService.forceReconnect(blockchainName);
    },
    updatePriceFeeds: async () => {
      if (!switchboardService) {
        throw new Error('Switchboard service not initialized');
      }

      const results = await switchboardService.updatePriceFeeds();

      return {
        success: results.every(r => r.success),
        results,
      };
    },
  },

  RoundPlayer: {
    totalTickets: async (
      parent: User,
      args: { roundId?: number; contractAddress?: string; tokenAddress?: string },
      context: any
    ) => {
      const { roundId, contractAddress, tokenAddress } = {
        ...context.roundParams,
        ...args
      };

      const whereConditions: any = {
        buyer: { id: parent.id },
      };

      if (roundId !== undefined) {
        whereConditions.roundId = roundId;
      }
      if (contractAddress) {
        whereConditions.contractAddress = contractAddress;
      }
      if (tokenAddress) {
        whereConditions.token = tokenAddress;
      }

      const purchases = await AppDataSource.getRepository(TicketPurchase).find({
        where: whereConditions,
      });

      const totalPurchased = purchases.reduce((sum, p) => sum + Number(p.count), 0);

      const hasBonusTicket = await AppDataSource
        .getRepository(FirstTicketBonus)
        .findOne({
          where: whereConditions,
        });

      return totalPurchased + (hasBonusTicket ? 1 : 0);
    },

    hasBonusTicket: async (
      parent: User,
      args: { roundId?: number; contractAddress?: string; tokenAddress?: string },
      context: any
    ) => {
      const { roundId, contractAddress, tokenAddress } = {
        ...context.roundParams,
        ...args
      };

      const whereConditions: any = {
        buyer: { id: parent.id },
      };

      if (roundId !== undefined) {
        whereConditions.roundId = roundId;
      }
      if (contractAddress) {
        whereConditions.contractAddress = contractAddress;
      }
      if (tokenAddress) {
        whereConditions.token = tokenAddress;
      }

      const hasBonusTicket = await AppDataSource
        .getRepository(FirstTicketBonus)
        .findOne({
          where: whereConditions,
        });

      return !!hasBonusTicket;
    },
  },
};
