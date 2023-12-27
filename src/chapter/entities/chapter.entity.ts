import { NovelRoomEntity } from '@app/novel-board/entities/novel-room.entity';
import { userEntity } from '@app/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryAuditiedPK } from '../../commons/entities/primary-auditied-pk.entity';

import {
  ChapterStatusEnum,
  ChapterStatusType,
} from './enums/chapter-status.enum';
@Entity({ name: 'chapter', schema: 'gow-server' })
export class ChapterEntity extends PrimaryAuditiedPK {
  @Column({ length: 255, unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: Object.values(ChapterStatusEnum),
    default: ChapterStatusEnum.WRITING,
  })
  status: ChapterStatusType;

  @ManyToOne(() => NovelRoomEntity, (room) => room.id)
  novelRoom: NovelRoomEntity;

  static of(
    novelRoom: number,
    status: ChapterStatusType,
    name: string,
    user: userEntity,
  ) {
    const chapter = new ChapterEntity();
    chapter.novelRoom = { id: novelRoom } as NovelRoomEntity;
    chapter.status = status;
    chapter.name = name;
    chapter.createdBy = user;
    chapter.updatedBy = user;
    return chapter;
  }
}
