import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { User } from './User';

/**
 * WinEvent entity representing a lottery win event from the blockchain
 * Corresponds to the WinnerPicked event in the smart contract
 */
@Entity('win_events')
@Index('IDX_win_events_tx_log', ['transactionHash', 'logIndex'], { unique: true })
export class WinEvent extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn()
  winner!: User;

  @Column({ length: 255 })
  @Index()
  token!: string;

  @Column()
  @Index()
  roundId!: number;

  @Column()
  chainId!: number;

  @Column({ length: 255 })
  @Index()
  contractAddress!: string;

  @Column()
  amount!: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'win_event_players',
    joinColumn: { name: 'win_event_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'player_id', referencedColumnName: 'id' },
  })
  players!: User[];

  @Column()
  ticketId!: string;

  @Column()
  blockTimestamp!: Date;

  @Column({ length: 255 })
  transactionHash!: string;

  @Column({ nullable: true })
  logIndex!: number;
}
