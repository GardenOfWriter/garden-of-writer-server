import { Entity, ManyToOne } from 'typeorm';
import { ChapterEntity } from './chapter.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { PrimaryGeneratedPkWithMetaTimeEntity } from '@app/commons/entities/primary-generated-pk-with-meta-time.entity';

@Entity({ name: 'chapter-like', schema: 'gow-server' })
export class ChapterLikeEntity extends PrimaryGeneratedPkWithMetaTimeEntity {
  @ManyToOne((_type) => UserEntity, (user) => user)
  user: UserEntity;

  @ManyToOne((_type) => ChapterEntity, (chpater) => chpater.chapterLike)
  chapter: ChapterEntity;

  static of(user: UserEntity, chapterId: number) {
    const chapterLike = new ChapterLikeEntity();
    chapterLike.user = user;
    chapterLike.chapter = { id: chapterId } as ChapterEntity;
    return chapterLike;
  }
}
