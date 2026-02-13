import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { User } from './User';
import { WinEvent } from './WinEvent';

@Entity('notifications')
@Index('IDX_notifications_user_unread', ['user', 'isRead'])
@Index('IDX_notifications_created_at', ['createdAt'])
export class Notification extends BaseEntity {
  @ManyToOne(() => User, user => user.notifications)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ default: false })
  @Index()
  isRead!: boolean;

  @ManyToOne(() => WinEvent)
  @JoinColumn()
  winEvent!: WinEvent;

  @Column()
  isWinner!: boolean;
}
