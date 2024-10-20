import { Entity, ManyToOne } from 'typeorm';
import { ChapterEntity } from './chapter.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { PrimaryGeneratedPkWithMetaTimeEntity } from '@app/commons/entities/primary-generated-pk-with-meta-time.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'chapter-like' })
export class ChapterLikeEntity extends PrimaryGeneratedPkWithMetaTimeEntity {
  @AutoMap()
  @ManyToOne((_type) => UserEntity, (user) => user)
  user: UserEntity;

  @AutoMap()
  @ManyToOne((_type) => ChapterEntity, (chpater) => chpater.chapterLike)
  chapter: ChapterEntity;

  static of(user: UserEntity, chapterId: number) {
    const chapterLike = new ChapterLikeEntity();
    chapterLike.user = user;
    chapterLike.chapter = { id: chapterId } as ChapterEntity;
    return chapterLike;
  }
}
