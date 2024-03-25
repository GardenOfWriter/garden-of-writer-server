import { getToDay } from '@app/commons/util/date.util';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedPkWithMetaTimeEntity } from '../../commons/entities/primary-generated-pk-with-meta-time.entity';
import {
  WriterCategoryType,
  WriterCategoryEnum,
} from './enums/writer-category.enum';
import { WriterStatusEnum, WriterStatusType } from './enums/writer-status.enum';

@Entity({ name: 'novel-writer', schema: 'gow-server' })
export class NovelWriterEntity extends PrimaryGeneratedPkWithMetaTimeEntity {
  @Column({
    type: 'enum',
    enum: Object.values(WriterCategoryEnum),
    default: WriterCategoryEnum.HOST,
  })
  category: WriterCategoryType;

  @Column({
    type: 'enum',
    enum: Object.values(WriterStatusEnum),
    default: WriterStatusEnum.REVIEW,
  })
  status: WriterStatusType;

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

  @ManyToOne(() => UserEntity, (user) => user.id, {
    eager: true,
  })
  user: UserEntity;

  @ManyToOne(() => NovelRoomEntity, (room) => room.id)
  novelRoom: NovelRoomEntity;

  isRepresentativeWriter(): boolean {
    return this.category === WriterCategoryEnum.HOST;
  }

  changeStatue(status: WriterStatusType): void {
    switch (status) {
      case 'attending':
        this.notifiedAt = getToDay();
        break;
      case 'reject':
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
    category: WriterCategoryType,
    status: WriterStatusType,
    user: UserEntity,
    writingSeq: number = 1,
    currentlyWriting: boolean = true,
  ) {
    const writer = new NovelWriterEntity();
    writer.novelRoom = { id: novelRoomId } as NovelRoomEntity;
    writer.user = user;
    writer.category = category;
    writer.status = status;
    writer.currentlyWriting = currentlyWriting;
    writer.writingSeq = writingSeq;
    return writer;
  }
}
