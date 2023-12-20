import { Column, Entity } from 'typeorm';
import { PrimaryAuditiedPK } from '../../commons/entities/primary-auditied-pk.entity';
import {
  NoveTextStatusEnum,
  NovelTextStatusType,
} from './enum/novel-text-status.enum';
@Entity({ name: 'novel-text', schema: 'gow-server' })
export class NovelTextEntity extends PrimaryAuditiedPK {
  @Column({
    type: 'enum',
    enum: Object.values(NoveTextStatusEnum),
    default: NoveTextStatusEnum.TEMP_SAVE,
  })
  status: NovelTextStatusType;

  @Column('text')
  content: string;

  @Column('bigint')
  chapterId: number;

  static of(chapterId: number, status: NovelTextStatusType, content: string) {
    const novel = new NovelTextEntity();
    novel.chapterId = chapterId;
    novel.status = status;
    novel.content = content;
    return novel;
  }
}
