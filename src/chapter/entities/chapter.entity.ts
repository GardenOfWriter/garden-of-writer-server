import { NovelRoomEntity } from '@app/novel-board/entities/novel-room.entity';
import { userEntity } from '@app/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PrimaryAuditiedPK } from '../../commons/entities/primary-auditied-pk.entity';
import { ChapterCommentEntity } from './chapter-comment.entity';

import {
  ChapterStatusEnum,
  ChapterStatusType,
} from './enums/chapter-status.enum';
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

  @ManyToOne(() => NovelRoomEntity, (room) => room.id)
  novelRoom: NovelRoomEntity;

  @Column('timestamp', { comment: '최종 작성일 ', nullable: true })
  finalWriteredAt: Date;

  @Column('timestamp', { comment: '연재 승인일', nullable: true })
  approvalDate: Date;

  @Column('int', { comment: '조회수', default: 0 })
  viewCount: number;

  @OneToMany((_type) => ChapterCommentEntity, (comment) => comment)
  chapterComment: ChapterCommentEntity[];

  static of(
    novelRoom: number,
    status: ChapterStatusType,
    title: string,
    user: userEntity,
  ) {
    const chapter = new ChapterEntity();
    chapter.novelRoom = { id: novelRoom } as NovelRoomEntity;
    chapter.status = status;
    chapter.title = title;
    chapter.createdBy = user;
    chapter.updatedBy = user;
    return chapter;
  }

  /**
   *
   */
  changeStatus(status: ChapterStatusType) {
    this.status = status;
  }

  changeTitle(title: string) {
    this.title = title;
  }
  /**
   *
   * 나중에 day.js 혹은 joda date 타임으로 변경
   */
  chapterApproved() {
    this.approvalDate = new Date();
  }

  chapterFinalWriterd() {
    this.finalWriteredAt = new Date();
  }
}
