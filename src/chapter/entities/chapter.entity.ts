import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PrimaryAuditiedPK } from '../../commons/entities/primary-auditied-pk.entity';
import { ChapterCommentEntity } from './chapter-comment.entity';

import { ChapterStatusEnum, ChapterStatusType } from './enums/chapter-status.enum';
import { convertDayFormat, getToDay, getToDayISO8601 } from '@app/commons/util/date.util';
import { ChapterLikeEntity } from './chapter-like.entity';
@Entity({ name: 'chapter', schema: 'gow-server' })
export class ChapterEntity extends PrimaryAuditiedPK {
  @Column('int', { comment: '소설공방의 회차 번호' })
  no: number;

  @Column({ length: 255, comment: '회차 제목' })
  title: string;

  @Column({
    type: 'enum',
    enum: Object.values(ChapterStatusEnum),
    default: ChapterStatusEnum.WRITING,
    comment: '회차 상태',
  })
  status: ChapterStatusType;

  @Column('bigint', { name: 'novel_room_id' })
  novelRoomId: number;

  @ManyToOne(() => NovelRoomEntity, (room) => room.id)
  novelRoom: NovelRoomEntity;

  @Column('timestamp', {
    comment: '최종 작성일 ',
    nullable: true,
    transformer: {
      to: (value) => value,
      from: (value) => (value ? convertDayFormat(value) : null),
    },
  })
  finalAt: Date;

  @Column('timestamp', {
    comment: '연재 승인일',
    nullable: true,
    transformer: {
      to: (value) => value,
      from: (value) => (value ? convertDayFormat(value) : null),
    },
  })
  approvalAt: Date;

  @Column('int', { comment: '조회수', default: 0 })
  viewCount: number;

  @OneToMany((_type) => ChapterCommentEntity, (comment) => comment)
  chapterComment: ChapterCommentEntity[];

  @OneToMany((_type) => ChapterLikeEntity, (like) => like.chapter)
  chapterLike: ChapterLikeEntity[];

  static of(novelRoomId: number, status: ChapterStatusType, user: UserEntity, title: string = '프롤로그') {
    const chapter = new ChapterEntity();
    chapter.no = 1;
    chapter.novelRoomId = novelRoomId;
    chapter.status = status;
    chapter.title = title;
    chapter.createdBy = user;
    chapter.updatedBy = user;
    return chapter;
  }

  setNo(no: number) {
    this.no = no;
  }

  changeStatus(status: ChapterStatusType) {
    this.status = status;
  }

  changeTitle(title: string) {
    this.title = title;
  }

  setReviewStatus() {
    this.status = ChapterStatusEnum.REVIEW;
  }
  chapterApproved() {
    this.approvalAt = getToDay();
    this.status = ChapterStatusEnum.APPROVE;
  }

  chapterFinalWriterd() {
    this.finalAt = getToDay();
  }
  isWritingStatus(): boolean {
    return this.status === ChapterStatusEnum.WRITING;
  }
}
