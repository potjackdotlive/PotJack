import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { BlockchainSync } from '../entities/BlockchainSync';
import { FirstTicketBonus } from '../entities/FirstTicketBonus';
import { Notification } from '../entities/Notification';
import { Round } from "../entities/Round";
import { TicketPurchase } from '../entities/TicketPurchase';
import { User } from '../entities/User';
import { UserRoundStats } from '../entities/UserRoundStats';
import { WinEvent } from '../entities/WinEvent';

// Explicit import of migrations
import * as migrations from '../migration';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'blockchain_lottery',
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
  entities: [
    BlockchainSync,
    FirstTicketBonus,
    Notification,
    Round,
    TicketPurchase,
    User,
    UserRoundStats,
    WinEvent,
  ],
  subscribers: [],
  migrations: Object.values(migrations),
  migrationsRun: process.env.NODE_ENV !== 'production' || process.env.AUTO_MIGRATIONS === 'true',
});
