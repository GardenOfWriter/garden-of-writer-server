import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryAuditiedPK } from '@app/commons/entities/primary-auditied-pk.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'chapter-comment' })
export class ChapterCommentEntity extends PrimaryAuditiedPK {
  @AutoMap()
  @Column('varchar', { length: 1000 })
  comment: string;

  @ManyToOne((_type) => ChapterEntity, (chapter) => chapter.chapterComment)
  chapter: ChapterEntity;
}
