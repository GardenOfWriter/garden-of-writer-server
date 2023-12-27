import { NovelRoomEntity } from '@app/novel-board/entities/novel-room.entity';
import { userEntity } from '@app/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedPkWithMetaTimeEntity } from '../../commons/entities/primary-generated-pk-with-meta-time.entity';

import {
  NovelWriterCategoryEnum,
  NovelWriterCategoryType,
} from './enums/novel-writer-category.enum';
import {
  NovelWriterStatusEnum,
  NovelWriterStatusType,
} from './enums/novel-writer-status.enum';

@Entity({ name: 'novel-writer', schema: 'gow-server' })
export class NovelWriterEntity extends PrimaryGeneratedPkWithMetaTimeEntity {
  @Column('int', { nullable: true })
  priority: number;

  @Column({
    type: 'enum',
    enum: Object.values(NovelWriterCategoryEnum),
    default: NovelWriterCategoryEnum.REPRESENTATIVE_WRITER,
  })
  category: NovelWriterCategoryType;

  @Column({
    type: 'enum',
    enum: Object.values(NovelWriterStatusEnum),
    default: NovelWriterStatusEnum.ATTENDING_REVIEW,
  })
  status: NovelWriterStatusType;

  @Column()
  novelRoomId: number;
  /**
   *  참여 신청 일
   */
  @Column('timestamp', { nullable: true })
  attendedAt: Date;
  /**
   *  참여 승인/반려일 일
   */
  @Column('timestamp', { nullable: true })
  notifiedAt: Date;
  /**
   *  퇴장일 => 참여를 했는데 방장에 의해 퇴장 당함
   */

  @Column('timestamp', { nullable: true })
  exitedAt: Date;

  @ManyToOne(() => userEntity, (user) => user.id, {
    eager: true,
  })
  user: userEntity;

  @ManyToOne(() => NovelRoomEntity, (room) => room.id)
  novelRoom: NovelRoomEntity;

  static of(
    novelRoomId: number,
    category: NovelWriterCategoryType,
    status: NovelWriterStatusType,
    user: userEntity,
  ) {
    const writer = new NovelWriterEntity();
    writer.novelRoom = { id: novelRoomId } as NovelRoomEntity;
    writer.user = user;
    writer.category = category;
    writer.status = status;
    return writer;
  }

  isRepresentativeWriter(): boolean {
    return this.category == NovelWriterCategoryEnum.PARTICIPATING_WRITER;
  }
  changeStatue(status: NovelWriterStatusType): void {
    this.status = status;
    this.notifiedAt = new Date();
  }
}
