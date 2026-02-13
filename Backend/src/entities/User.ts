import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { Notification } from './Notification';
import { UserRoundStats } from './UserRoundStats';

/**
 * User entity representing a blockchain address that participates in lotteries
 */
@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 255, unique: true })
  address!: string;

  @OneToMany(() => Notification, notification => notification.user)
  notifications!: Notification[];

  @OneToMany(() => UserRoundStats, stats => stats.user)
  roundStats?: UserRoundStats[];
}
