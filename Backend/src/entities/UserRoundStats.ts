import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { User } from './User';

/**
 * UserRoundStats entity representing statistics for a user in a specific round
 * Used to track ticket purchases per round and calculate badges
 */
@Entity('user_round_stats')
@Unique('UQ_user_round_stats', ['user', 'token', 'roundId', 'contractAddress'])
export class UserRoundStats extends BaseEntity {
  @ManyToOne(() => User, user => user.roundStats, { eager: true })
  @JoinColumn({ name: 'userId' , referencedColumnName: 'id' },)
  user!: User;

  @Column({ length: 255 })
  @Index()
  token!: string;

  @Column()
  @Index()
  roundId!: number;

  @Column({ length: 255 })
  @Index()
  contractAddress!: string;

  @Column({ default: 0 })
  ticketCount!: number;

  @Column({ default: false })
  isConsecutive!: boolean;

  @Column({ default: 0 })
  consecutiveRounds!: number;

  @Column({ default: 0 })
  totalWins!: number;

  @Column()
  roundTimestamp!: Date;
}
