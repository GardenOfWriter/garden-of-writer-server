import { getToDay, getToDayISO8601 } from '@app/commons/util/date.util';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
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

  @Column('boolean', { comment: '현재 작성 여부', nullable: true })
  currentlyWriting: boolean;

  @Column('int', { comment: '현재 작성 여부', nullable: true })
  writingSeq: number;

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

  isRepresentativeWriter(): boolean {
    return this.category === NovelWriterCategoryEnum.REPRESENTATIVE_WRITER;
  }

  changeStatue(status: NovelWriterStatusType): void {
    switch (status) {
      case 'attending':
        this.notifiedAt = getToDay();
        break;
      case 'attendingReject':
        this.notifiedAt = getToDay();
        break;
      case 'exit':
        this.exitedAt = getToDay();
        break;
    }
    this.status = status;
  }

  setSeq(seq: number) {
    if (seq <= 0) {
      throw new Error('seq value cannot be less than or equal to 0');
    }
    this.writingSeq = seq;
  }
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
}
