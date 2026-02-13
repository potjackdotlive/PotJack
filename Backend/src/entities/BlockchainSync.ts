import { Column, Entity } from 'typeorm';

import { BaseEntity } from './BaseEntity';

@Entity()
export class BlockchainSync extends BaseEntity {
  @Column()
  blockchainName!: string;

  @Column()
  contractAddress!: string;

  @Column({ type: 'bigint' })
  lastSyncedBlock!: number;
}
