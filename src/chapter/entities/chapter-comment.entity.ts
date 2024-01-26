import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { userEntity } from '@app/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryAuditiedPK } from '../../commons/entities/primary-auditied-pk.entity';
import { ChapterEntity } from '@app/chapter/entities/chapter.entity';

@Entity({ name: 'chapterComment', schema: 'gow-server' })
export class ChapterCommentEntity extends PrimaryAuditiedPK {
  @Column('varchar', { length: 1000 })
  comment: string;

  @ManyToOne((_type) => ChapterEntity, (chapter) => chapter.chapterComment)
  chapter: ChapterEntity;
}
