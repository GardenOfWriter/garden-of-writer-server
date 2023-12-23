import { Column, Entity } from 'typeorm';
import { PrimaryAuditiedPK } from '../../commons/entities/primary-auditied-pk.entity';

@Entity({ name: 'novel-attend-board', schema: 'gow-server' })
export class NovelAttendBoardEntity extends PrimaryAuditiedPK {
  @Column({ length: 255, unique: true })
  title: string;

  @Column('text')
  content: string;

  @Column('int')
  viewCount: string;

  @Column('bigint')
  novelRoomId: number;
}
