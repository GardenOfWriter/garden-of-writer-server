import { Column, Entity } from 'typeorm';
import { PrimaryAuditiedPK } from '../../commons/entities/primary-auditied-pk.entity';

@Entity({ name: 'novel-board', schema: 'gow-server' })
export class NovelBoardEntity extends PrimaryAuditiedPK {
  // @Column({
  //   type: 'enum',
  //   enum: Object.values(NovelBoardStatusEnum),
  //   default: NovelBoardStatusEnum.WRITING,
  // })
  // status: NovelBoardStatusType;

  @Column({ length: 255, unique: true })
  title: string;

  @Column('text')
  content: string;

  @Column('int')
  viewCount: string;

  @Column('bigint')
  novelRoomId: number;
}
