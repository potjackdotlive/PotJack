import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { User } from './User';

/**
 * FirstTicketBonus entity representing a first ticket bonus event from the blockchain
 * Corresponds to the FirstTicketBonusAwarded event in the smart contract
 */
@Entity('first_ticket_bonuses')
@Index('IDX_first_ticket_bonuses_tx_log', ['transactionHash', 'logIndex'], { unique: true })
export class FirstTicketBonus extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn()
  buyer!: User;

  @Column({ length: 255 })
  @Index()
  token!: string;

  @Column()
  @Index()
  roundId!: number;

  @Column()
  @Index()
  chainId!: number;

  @Column({ length: 255 })
  @Index()
  contractAddress!: string;

  @Column()
  blockTimestamp!: Date;

  @Column({ length: 255 })
  transactionHash!: string;

  @Column({ nullable: true })
  logIndex!: number;
}
