import { Column, Entity } from 'typeorm';
import { PrimaryAuditiedPK } from '../../commons/entities/primary-auditied-pk.entity';
import { NoveStatusEnum, NovelStatusType } from './enum/novel-status.enum';
@Entity({ name: 'novel', schema: 'gow-server' })
export class NovelEntity extends PrimaryAuditiedPK {
  @Column({
    type: 'enum',
    enum: Object.values(NoveStatusEnum),
    default: NoveStatusEnum.TEMP_SAVE,
  })
  status: NovelStatusType;

  @Column('text')
  content: string;

  @Column('bigint')
  chapterId: number;

  static of(chapterId: number, status: NovelStatusType, content: string) {
    const novel = new NovelEntity();
    novel.chapterId = chapterId;
    novel.status = status;
    novel.content = content;
    return novel;
  }
}
