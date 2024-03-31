import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { TagEntity } from './tag.entity';
import { PrimaryGeneratedPkEntity } from '@app/commons/entities/primary-generated-pk.entity';

@Entity({ name: 'novel-tag', schema: 'gow-server' })
export class NovelTagEntity extends PrimaryGeneratedPkEntity {
  @Column('bigint')
  novelRoomId: number;

  @Column('bigint')
  tagId: number;

  @ManyToOne(() => NovelRoomEntity, (novelRoom) => novelRoom.novelTag)
  novelRoom: NovelRoomEntity;

  @ManyToOne(() => TagEntity, (novelTag) => novelTag.noveTag)
  tag: TagEntity;

  static of(roomId: number, tagId: number) {
    const novelTag = new NovelTagEntity();
    novelTag.novelRoomId = roomId;
    novelTag.tagId = tagId;
    return novelTag;
  }
}
