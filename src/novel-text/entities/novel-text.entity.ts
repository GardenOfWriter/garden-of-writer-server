import { Column, Entity } from 'typeorm';
import { PrimaryAuditiedPK } from '../../commons/entities/primary-auditied-pk.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { NovelTextStatusEnum, NovelTextStatusType } from './enum/novel-text-status.enum';
@Entity({ name: 'novel-text' })
export class NovelTextEntity extends PrimaryAuditiedPK {
  @Column({
    type: 'enum',
    enum: Object.values(NovelTextStatusEnum),
    default: NovelTextStatusEnum.TEMP_SAVE,
  })
  status: NovelTextStatusType;

  @Column('text')
  content: string;

  @Column('bigint')
  chapterId: number;

  setComplated() {
    this.status = NovelTextStatusEnum.COMPLETED;
  }

  updateContent(content: string) {
    this.content = content;
  }

  static of(chapterId: number, status: NovelTextStatusType, content: string, user: UserEntity) {
    const novelText = new NovelTextEntity();
    novelText.chapterId = chapterId;
    novelText.status = status;
    novelText.content = content;
    novelText.createdBy = user;
    novelText.updatedBy = user;
    return novelText;
  }
}
