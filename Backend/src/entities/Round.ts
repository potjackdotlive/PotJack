import { Entity, Column, Index } from 'typeorm';

import { BaseEntity } from './BaseEntity';

/**
 * Round entity representing a round in raffle
 */
@Entity('rounds')
export class Round extends BaseEntity {

  @Column({ length: 255 })
  @Index()
  contractAddress!: string;

  @Column({ length: 255 })
  @Index()
  token!: string;

  @Column()
  @Index()
  roundId!: number;

  @Column()
  @Index()
  chainId!: number;

  @Column()
  startTime!: Date;

  @Column()
  endTime!: Date;

  @Column({ type: 'varchar', nullable: true })
  prizeAmount?: string;

  @Column({ type: 'varchar', nullable: true })
  commissionAmount?: string;

  @Column({ type: 'boolean', default: false })
  prizeClaimed!: boolean;

}
