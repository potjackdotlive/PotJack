import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { User } from './User';

/**
 * TicketPurchase entity representing a ticket purchase event from the blockchain
 * Corresponds to the TicketPurchased event in the smart contract
 */
@Entity('ticket_purchases')
@Index('IDX_ticket_purchases_tx_log', ['transactionHash', 'logIndex'], { unique: true })
export class TicketPurchase extends BaseEntity {
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
  count!: number;

  @Column()
  totalAmount!: string;

  @Column()
  blockTimestamp!: Date;

  @Column({ length: 255,  })
  transactionHash!: string;

  @Column({ nullable: true })
  logIndex!: number;
}
