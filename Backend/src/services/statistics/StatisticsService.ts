import {Brackets, Repository, SelectQueryBuilder} from 'typeorm';

import {AppDataSource} from '../../config/database';
import {FirstTicketBonus} from '../../entities/FirstTicketBonus';
import {User} from '../../entities/User';
import {UserRoundStats} from '../../entities/UserRoundStats';
import {WinEvent} from '../../entities/WinEvent';
import {TicketPurchase} from '../../entities/TicketPurchase';
import {RawUserStats} from '../../types/Statistics';
import {Round} from "../../entities/Round";
import logger from "../../utils/logger";

export class StatisticsService {
  private readonly userRepository: Repository<User>;
  private readonly userRoundStatsRepository: Repository<UserRoundStats>;
  private readonly firstTicketBonusRepository: Repository<FirstTicketBonus>;
  private readonly winEventRepository: Repository<WinEvent>;
  private readonly roundRepository: Repository<Round>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.userRoundStatsRepository = AppDataSource.getRepository(UserRoundStats);
    this.firstTicketBonusRepository = AppDataSource.getRepository(FirstTicketBonus);
    this.winEventRepository = AppDataSource.getRepository(WinEvent);
    this.roundRepository = AppDataSource.getRepository(Round);
  }

  private createRankedStatsSubquery(
    subquery: SelectQueryBuilder<UserRoundStats>,
    contractAddress?: string,
    tokenAddress?: string,
    roundId?: number,
  ) {
    subquery
      .select('stats.contractAddress', 'contractAddress')
      .addSelect('MAX(stats.token)', 'token')
      .addSelect('MAX(stats.roundId)', 'roundId')
      .addSelect('MAX(stats.consecutiveRounds)', 'consecutiveRounds')
      .addSelect('users.address', 'address')
      .addSelect('SUM(stats.ticketCount)', 'totalTickets')
      .addSelect('COALESCE(MAX(wins."totalWins"), 0)', 'totalWins')
      .addSelect(
        'ROW_NUMBER() OVER (ORDER BY (SUM(stats.ticketCount) + COALESCE(SUM(bonuses."bonusCount"), 0)) DESC, MAX(purchases."lastPurchaseAt") ASC)',
        'rank',
      )
      .addSelect('MAX(SUM(stats.ticketCount)) OVER ()', 'maxTickets')
      .addSelect(
        '(SUM(stats.ticketCount) + COALESCE(SUM(bonuses."bonusCount"), 0))',
        'totalTicketsWithBonus',
      )
      .from(UserRoundStats, 'stats')
      .leftJoin('stats.user', 'users');

    subquery.leftJoin(
      qb =>
        qb
          .subQuery()
          .select('ftb."buyerId"', 'buyerId')
          .addSelect('ftb."contractAddress"', 'contractAddress')
          .addSelect('ftb.token', 'token')
          .addSelect('ftb."roundId"', 'roundId')
          .addSelect('COUNT(*)', 'bonusCount')
          .from(FirstTicketBonus, 'ftb')
          .groupBy('ftb."buyerId", ftb."contractAddress", ftb.token, ftb."roundId"'),
      'bonuses',
      'bonuses."buyerId" = users.id ' +
      'AND bonuses."contractAddress" = stats."contractAddress" ' +
      'AND bonuses.token = stats.token ' +
      'AND bonuses."roundId" = stats."roundId"',
    );

    subquery.leftJoin(
      qb =>
        qb
          .subQuery()
          .select('tp."buyerId"', 'buyerId')
          .addSelect('tp."contractAddress"', 'contractAddress')
          .addSelect('tp.token', 'token')
          .addSelect('tp."roundId"', 'roundId')
          .addSelect('MAX(tp."createdAt")', 'lastPurchaseAt')
          .from(TicketPurchase, 'tp')
          .groupBy('tp."buyerId", tp."contractAddress", tp.token, tp."roundId"'),
      'purchases',
      'purchases."buyerId" = users.id ' +
      'AND purchases."contractAddress" = stats."contractAddress" ' +
      'AND purchases.token = stats.token ' +
      'AND purchases."roundId" = stats."roundId"',
    );

    subquery.leftJoin(
      qb =>
        qb
          .subQuery()
          .select('we."winnerId"', 'winnerId')
          .addSelect('COUNT(*)', 'totalWins')
          .from(WinEvent, 'we')
          .groupBy('we."winnerId"'),
      'wins',
      'wins."winnerId" = users.id',
    );

    if (!tokenAddress && (roundId === undefined || roundId === null)) {
      subquery.innerJoin(
        qb =>
          qb
            .subQuery()
            .select('r."contractAddress"', 'contractAddress')
            .addSelect('r.token', 'token')
            .addSelect(`
                CASE
                  WHEN MAX("r"."roundId") IS NULL THEN 0
                  WHEN MAX("r"."endTime") < NOW() THEN MAX("r"."roundId") + 1
                  ELSE MAX("r"."roundId")
                END
              `, 'openRoundId'
            )
            .from(Round, 'r')
            .groupBy('r."contractAddress", r.token'),
        'closedRounds',
        '"closedRounds"."contractAddress" = stats."contractAddress" ' +
        'AND "closedRounds".token = stats.token ' +
        'AND "closedRounds"."openRoundId" = stats."roundId"',
      );
    }

    if (contractAddress) {
      subquery.andWhere('stats.contractAddress = :contractAddress', {contractAddress});
    }
    if (tokenAddress) {
      subquery.andWhere('stats.token = :token', {token: tokenAddress});
    }
    if (roundId !== undefined && roundId !== null) {
      subquery.andWhere('stats.roundId = :roundId', {roundId});
    }

    subquery.groupBy('stats."contractAddress", users."address"');

    return subquery.orderBy('"rank"', 'ASC');
  }

  public async getWinStatistics(
    walletAddress: string | undefined,
    contractAddress: string | undefined,
    tokenAddress: string | undefined,
    search: string | undefined,
    limit: number,
    offset: number,
  ) {
    const winEventRepository = AppDataSource.getRepository(WinEvent);
    const queryBuilder = winEventRepository
      .createQueryBuilder('winEvent')
      .innerJoin('winEvent.players', 'player')
      .innerJoin('winEvent.winner', 'winner')
      .select('winEvent.id', 'id')
      .addSelect('winner.address', 'winnerAddress')
      .addSelect('winEvent.token', 'token')
      .addSelect('winEvent.roundId', 'roundId')
      .addSelect('winEvent.contractAddress', 'contractAddress')
      .addSelect('winEvent.amount', 'amount')
      .addSelect('COUNT(player.id)', 'playersCount')
      .addSelect('winEvent.ticketId', 'ticketId')
      .addSelect('winEvent.blockTimestamp', 'blockTimestamp')
      .addSelect('winEvent.transactionHash', 'transactionHash')
      .addSelect('winEvent.logIndex', 'logIndex')
      .addSelect('winEvent.createdAt', 'createdAt')
      .addSelect('winEvent.updatedAt', 'updatedAt')
      .addSelect('winEvent.winnerId', 'winnerId')
      .addSelect('COUNT(1) OVER ()', 'totalElements')
      .where('1 = 1');

    // Apply optional filters
    if (walletAddress) {
      queryBuilder.andWhere('winner.address = :walletAddress', { walletAddress });
    }
    if (contractAddress) {
      queryBuilder.andWhere('winEvent.contractAddress = :contractAddress', {contractAddress});
    }
    if (tokenAddress) {
      queryBuilder.andWhere('winEvent.token = :token', {token: tokenAddress});
    }
    if (search) {
      if (/^\d+$/.test(search)) {
        const searchNum = Number(search) - 1;
        queryBuilder.andWhere('"winEvent"."roundId" = :searchNum', {searchNum});
      } else {
        queryBuilder.andWhere(
          new Brackets(qb => {
            qb.where('"winner"."address" ILIKE :search', {search: `%${search}%`}).orWhere(
              '"winEvent"."token" ILIKE :search',
              {search: `%${search}%`},
            );
          }),
        );
      }
    }

    queryBuilder.groupBy('"winEvent"."id"').addGroupBy('"winner"."address"');

    // Apply pagination
    queryBuilder.offset(offset).limit(limit);

    // Order by timestamp descending
    queryBuilder.orderBy('winEvent.blockTimestamp', 'DESC');

    const content = [];
    const winEvents = await queryBuilder.getRawMany();

    for (const winEvent of winEvents) {
      logger.debug(`Fetching winner stats`, {
        contractAddress: winEvent.contractAddress,
        token: winEvent.token,
        roundId: winEvent.roundId,
        winnerAddress: winEvent.winnerAddress,
      });

      const winnerStats = await AppDataSource.manager
        .createQueryBuilder()
        .from(
          qb => this.createRankedStatsSubquery(
            qb.subQuery(),
            winEvent.contractAddress,
            winEvent.token,
            winEvent.roundId,
          ),
          'ranked_stats',
        )
        .where('ranked_stats.address ILIKE :winnerAddress', {winnerAddress: winEvent.winnerAddress})
        .getRawOne();

      logger.debug(`Winner stats result`, {
        winnerAddress: winEvent.winnerAddress,
        roundId: winEvent.roundId,
        winnerStats,
      });

      const rank = winnerStats ? parseInt(winnerStats.rank, 10) : null;

      logger.debug(`Computed badges`, {
        winnerAddress: winEvent.winnerAddress,
        roundId: winEvent.roundId,
        rank,
        consecutiveRounds: winnerStats?.consecutiveRounds,
        hasWhaleBadge: rank === 1,
        hasCrownBadge: rank === 1,
        hasDiamondBadge: !!winnerStats && Number(winnerStats.consecutiveRounds) >= 2,
      });

      content.push({
        id: winEvent.id,
        winner: {
          address: winEvent.winnerAddress,
          badges: {
            hasWhaleBadge: rank === 1,
            hasCrownBadge: rank === 1,
            hasDiamondBadge: !!winnerStats && Number(winnerStats.consecutiveRounds) >= 2,
          },
        },
        token: winEvent.token,
        roundId: winEvent.roundId,
        ticketId: winEvent.ticketId,
        contractAddress: winEvent.contractAddress,
        amount: winEvent.amount,
        playersCount: winEvent.playersCount,
        blockTimestamp: winEvent.blockTimestamp,
        transactionHash: winEvent.transactionHash,
        logIndex: winEvent.logIndex,
        createdAt: winEvent.createdAt,
        updatedAt: winEvent.updatedAt,
      });
    }

    const totalElements = parseInt(winEvents[0]?.totalElements || 0);

    return {content, totalElements, totalPages: Math.ceil(totalElements / limit)};
  }

  public async getUserWins(walletAddress: string | undefined) {
    const user = await this.userRepository.findOne({
      where: {address: walletAddress},
    });

    const result = await this.winEventRepository
      .createQueryBuilder('winEvent')
      .select('COUNT("winEvent".id)', 'totalWins')
      .where('"winEvent"."winnerId" = :userId', {userId: user?.id})
      .getRawOne<{ totalWins: string }>();

    return result?.totalWins || 0;
  }

  public async getUserStatistics(
    walletAddress: string | undefined,
    contractAddress: string | undefined,
    tokenAddress: string | undefined,
    roundId: number | undefined,
    limit: number,
    offset: number,
  ) {
    if (contractAddress && tokenAddress && (roundId === undefined || roundId === null)) {
      roundId = await this.getOpenRoundId(contractAddress, tokenAddress);
    }

    const statsQuery = AppDataSource.manager
      .createQueryBuilder()
      .from(
        qb =>
          this.createRankedStatsSubquery(
            qb.subQuery(),
            contractAddress,
            tokenAddress,
            roundId,
          ).addSelect('COUNT(1) OVER ()', 'totalElements'),
        'ranked_stats',
      );

    if (walletAddress) {
      statsQuery.andWhere('ranked_stats.address ilike :address', {
        address: `%${walletAddress}%`,
      });
    }

    const allStats = await statsQuery.offset(offset).limit(limit).getRawMany<RawUserStats>();

    if (allStats.length === 0) {
      return {content: [], totalElements: 0, totalPages: 0};
    }

    let winEvent = null;
    if (roundId !== undefined && tokenAddress && contractAddress) {
      winEvent = await this.winEventRepository.findOne({
        where: {
          token: tokenAddress,
          roundId,
          contractAddress,
        },
        relations: ['winner']
      });
    }

    const result = allStats.map(this.mapStats(winEvent));

    const totalElements = Number(allStats[0]?.totalElements || 0);

    return {content: result, totalElements, totalPages: Math.ceil(totalElements / limit)};
  }

  public async getSelfStatistics(
    walletAddress: string[],
    contractAddress?: string,
    tokenAddress?: string,
    roundId?: number,
  ) {
    if (contractAddress && tokenAddress && (roundId === undefined || roundId === null)) {
      roundId = await this.getOpenRoundId(contractAddress, tokenAddress);
    }

    const userStats = await AppDataSource.manager
      .createQueryBuilder()
      .from(
        qb => this.createRankedStatsSubquery(qb.subQuery(), contractAddress, tokenAddress, roundId),
        'ranked_stats',
      )
      .where('ranked_stats.address ILIKE ANY(:walletAddress)', {walletAddress})
      .getRawMany<RawUserStats>();

    if (userStats.length === 0) {
      return [];
    }

    let winEvent = null;
    if (roundId !== undefined && tokenAddress && contractAddress) {
      winEvent = await this.winEventRepository.findOne({
        where: {
          token: tokenAddress,
          roundId,
          contractAddress,
        },
        relations: ['winner']
      });
    }

    return userStats.map(this.mapStats(winEvent));
  }

  private async getOpenRoundId(contractAddress: string, tokenAddress: string): Promise<number> {
    const lastRound = await this.roundRepository.findOne({
      where: { contractAddress, token: tokenAddress },
      order: { roundId: 'DESC' },
    });

    if (!lastRound) {
      return 0;
    }

    if (lastRound.endTime < new Date()) {
      return lastRound.roundId + 1;
    }

    return lastRound.roundId;
  }

  public async getUnclaimedPrizes(
    winnerAddress: string,
    contractAddress: string,
  ): Promise<{ totalPrizeAmount: string; rounds: number[] }> {
    const user = await this.userRepository.findOne({
      where: { address: winnerAddress },
    });

    if (!user) {
      return { totalPrizeAmount: '0', rounds: [] };
    }

    const rows = await this.roundRepository
      .createQueryBuilder('round')
      .innerJoin(
        'win_events',
        'we',
        'we.token = round.token AND we."roundId" = round."roundId" AND we."contractAddress" = round."contractAddress" AND we."chainId" = round."chainId"',
      )
      .where('we."winnerId" = :userId', { userId: user.id })
      .andWhere('round."contractAddress" = :contractAddress', { contractAddress })
      .andWhere('round."prizeClaimed" = false')
      .andWhere('round."endTime" < NOW()')
      .andWhere('we."blockTimestamp" < NOW()')
      .select([
        'round."roundId" AS "roundId"',
        'round."prizeAmount" AS "prizeAmount"',
      ])
      .getRawMany<{ roundId: number; prizeAmount: string }>();

    const totalPrizeAmount = rows
      .reduce((sum, r) => sum + Number(r.prizeAmount), 0)
      .toString();

    const roundIds = rows.map(r => r.roundId);

    return {
      totalPrizeAmount,
      rounds: roundIds,
    };
  }

  public async getRoundPlayers(
    contractAddress: string,
    tokenAddress: string,
    roundId: number
  ): Promise<User[]> {
    try {
      const userRoundStats = await this.userRoundStatsRepository.find({
        where: {
          roundId,
          contractAddress,
          token: tokenAddress,
        },
        relations: ['user'],
      });

      const players = userRoundStats.map(stat => stat.user);
      logger.debug(`Found ${players.length} unique players for round ${roundId}`);

      return players;
    } catch (error) {
      logger.error(`Error getting round players:`, error);
      return [];
    }
  }

  private mapStats(winEvent: WinEvent | null) {
    return (stats: RawUserStats) => {
      const rankNum = stats.rank == null ? null : parseInt(stats.rank, 10);

      return {
        rank: rankNum,
        userAddress: stats.address,
        tickets: stats.totalTicketsWithBonus,
        totalWins: stats.totalWins,
        badges: {
          hasWhaleBadge: rankNum === 1,
          hasCrownBadge: rankNum === 1,
          hasDiamondBadge: Number(stats.consecutiveRounds) >= 2,
        },
        contractAddress: stats.contractAddress,
        tokenAddress: stats.token || '',
        roundId: stats.roundId,
        isWinner: winEvent?.winner?.address === stats.address,
      };
    }
  }
}
