import {Repository} from 'typeorm';

import {AppDataSource} from '../../config/database';
import {BlockchainSync} from '../../entities/BlockchainSync';
import {FirstTicketBonus} from '../../entities/FirstTicketBonus';
import {Notification} from '../../entities/Notification';
import {Round} from "../../entities/Round";
import {TicketPurchase} from '../../entities/TicketPurchase';
import {UserRoundStats} from '../../entities/UserRoundStats';
import {User} from '../../entities/User';
import {WinEvent} from '../../entities/WinEvent';

export class CleanupService {
  // Repository properties
  private blockchainSyncRepository: Repository<BlockchainSync>;
  private firstTicketBonusRepository: Repository<FirstTicketBonus>;
  private notificationsRepository: Repository<Notification>;
  private roundsRepository: Repository<Round>;
  private ticketPurchaseRepository: Repository<TicketPurchase>;
  private userRoundStatsRepository: Repository<UserRoundStats>;
  private userRepository: Repository<User>;
  private winEventRepository: Repository<WinEvent>;

  constructor() {
    // Initialize repositories
    this.blockchainSyncRepository = AppDataSource.getRepository(BlockchainSync);
    this.firstTicketBonusRepository = AppDataSource.getRepository(FirstTicketBonus);
    this.notificationsRepository = AppDataSource.getRepository(Notification);
    this.roundsRepository = AppDataSource.getRepository(Round);
    this.ticketPurchaseRepository = AppDataSource.getRepository(TicketPurchase);
    this.userRoundStatsRepository = AppDataSource.getRepository(UserRoundStats);
    this.userRepository = AppDataSource.getRepository(User);
    this.winEventRepository = AppDataSource.getRepository(WinEvent);
  }

  private async cleanRepo(repo: Repository<any>): Promise<void> {
    await repo
      .createQueryBuilder()
      .delete()
      .execute();
  }

  // Start listening for events
  public async clean(): Promise<void> {
    const reposWithContractAddress = [
      this.winEventRepository,
      this.userRepository,
      this.notificationsRepository,
      this.userRoundStatsRepository,
      this.blockchainSyncRepository,
      this.firstTicketBonusRepository,
      this.ticketPurchaseRepository,
      this.roundsRepository
    ];

    const promiseList: Promise<any>[] = [];

    reposWithContractAddress.forEach(async (repo) => {
      promiseList.push(this.cleanRepo(repo))
    })

    await Promise.all(promiseList)
  }

}
