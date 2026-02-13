import { FindOptionsWhere, Repository } from 'typeorm';

import { AppDataSource } from '../../config/database';
import { Notification } from '../../entities/Notification';
import { WinEvent } from '../../entities/WinEvent';
import logger from '../../utils/logger';

export class NotificationService {
  private notificationRepository: Repository<Notification>;

  constructor() {
    this.notificationRepository = AppDataSource.getRepository(Notification);
  }

  async createWinNotifications(winEvent: WinEvent): Promise<void> {
    try {
      const notifications: Notification[] = [];

      const winnerNotification = this.notificationRepository.create({
        user: winEvent.winner,
        winEvent,
        isWinner: true,
        isRead: false,
      });
      notifications.push(winnerNotification);

      for (const player of winEvent.players) {
        if (player.id !== winEvent.winner.id) {
          const playerNotification = this.notificationRepository.create({
            user: player,
            winEvent,
            isWinner: false,
            isRead: false,
          });
          notifications.push(playerNotification);
        }
      }

      await this.notificationRepository.save(notifications);
      logger.info(`Created ${notifications.length} notifications for round ${winEvent.roundId}`);
    } catch (error) {
      logger.error('Error creating win notifications:', error);
      throw error;
    }
  }

  async markAsRead(notificationId: string, userAddress: string): Promise<boolean> {
    const notification = await this.notificationRepository.findOne({
      where: {
        id: notificationId,
        user: { address: userAddress }
      }
    });

    if (!notification) {
      return false;
    }
    if (notification.isRead) {
      return true;
    }

    const result = await this.notificationRepository.update(
      { id: notificationId },
      { isRead: true },
    );
    return (result?.affected || 0) > 0;
  }

  async markAllAsRead(userAddress: string): Promise<number> {
    const result = await this.notificationRepository
      .createQueryBuilder()
      .update(Notification)
      .set({ isRead: true })
      .where("isRead = false")
      .andWhere("userId IN (SELECT id FROM users WHERE address = :userAddress)", { userAddress })
      .execute();

    return result.affected || 0;
  }

  async getUserNotifications(
    userAddress: string,
    limit: number = 20,
    offset: number = 0,
    unreadOnly: boolean = false,
  ) {
    let whereConditions: FindOptionsWhere<Notification> = { user: { address: userAddress } };
    if (unreadOnly) {
      whereConditions = { ...whereConditions , isRead: false };
    }

    // can be optimized (remove redundant joins)
    const [notifications, totalCount] = await this.notificationRepository.findAndCount({
      where: whereConditions,
      relations: {
        user: true,
        winEvent: {
          winner: true,
          players: true,
        },
      },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    let unreadCount: number;
    if (unreadOnly) {
      unreadCount = totalCount;
    } else {
      unreadCount = await this.notificationRepository.count({
        where: { user: { address: userAddress }, isRead: false },
      });
    }

    const mapped = notifications.map(n => {
      const winEvent = n.winEvent;

      return {
        id: n.id,
        isRead: n.isRead,
        isWinner: n.isWinner,
        createdAt: n.createdAt,
        updatedAt: n.updatedAt,
        winEvent: {
          id: winEvent.id,
          winner: {
            address: winEvent.winner.address,
            badges: {
              hasWhaleBadge: false,
              hasCrownBadge: false,
              hasDiamondBadge: false,
            },
          },
          token: winEvent.token,
          roundId: winEvent.roundId,
          ticketId: winEvent.ticketId,
          contractAddress: winEvent.contractAddress,
          amount: winEvent.amount,
          playersCount: Array.isArray(winEvent.players) ? winEvent.players.length : 0,
          blockTimestamp: winEvent.blockTimestamp,
          transactionHash: winEvent.transactionHash,
          logIndex: winEvent.logIndex,
          createdAt: winEvent.createdAt,
          updatedAt: winEvent.updatedAt,
        },
      };
    });

    return { notifications: mapped, totalCount, unreadCount };
  }
}
