import { NovelRoomEntity } from '@app/novel-board/entities/novel-room.entity';
import { userEntity } from '@app/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedPkWithMetaTimeEntity } from '../../commons/entities/primary-generated-pk-with-meta-time.entity';
import {
  NovelWriterStatusEnum,
  NovelWriterStatusType,
} from './enums/novel-writer.enum';

@Entity({ name: 'novel-writer', schema: 'gow-server' })
export class NovelWriterEntity extends PrimaryGeneratedPkWithMetaTimeEntity {
  @Column('int', { nullable: true })
  priority: number;

  @Column({
    type: 'enum',
    enum: Object.values(NovelWriterStatusEnum),
    default: NovelWriterStatusEnum.REPRESENTATIVE_WRITER,
  })
  status: NovelWriterStatusType;

  @Column()
  novelRoomId: number;

  @ManyToOne(() => userEntity, (user) => user.id)
  user: userEntity;

  @ManyToOne(() => NovelRoomEntity, (room) => room.id)
  novelRoom: NovelRoomEntity;

  static of(
    novelRoomId: number,
    status: NovelWriterStatusType,
    user: userEntity,
  ) {
    const writer = new NovelWriterEntity();
    writer.novelRoom = { id: novelRoomId } as NovelRoomEntity;
    writer.user = user;
    writer.status = status;
    return writer;
  }
}
