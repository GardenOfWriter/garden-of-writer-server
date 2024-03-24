import {
  ChapterStatusEnum,
  ChapterStatusType,
} from '@app/chapter/entities/enums/chapter-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ChapterEntity } from '../../entities/chapter.entity';

export class FindChapterRoomIdResDto {
  private _id: number;
  private _no: number;
  private _status: ChapterStatusType;
  private _title: string;
  private _approvalDate: Date;
  private _finalWriteredAt: Date;
  private _viewCount: number;

  constructor(entity: ChapterEntity) {
    this._id = entity.id;
    this._status = entity.status;
    this._title = entity.title;
    this._approvalDate = entity.approvalDate;
    this._finalWriteredAt = entity.finalWriteredAt;
    this._viewCount = entity.viewCount;
    this._no = entity.no;
  }

  @ApiProperty({
    example: 1,
    description: '회차 ID',
  })
  @Expose()
  get id(): number {
    return this._id;
  }
  @ApiProperty({
    example: 1,
    description: '회차 no',
  })
  @Expose()
  get no(): number {
    return this._no;
  }
  @ApiProperty({
    enum: ChapterStatusEnum,
    example: ChapterStatusEnum.WRITING,
    description: '회차 상태',
  })
  @Expose()
  get status(): ChapterStatusType {
    return this._status;
  }

  @ApiProperty({
    example: '프롤로그',
    description: '회차명',
  })
  @Expose()
  get title(): string {
    return this._title;
  }

  @ApiProperty({
    example: '2023-01-01 10:00:00',
    description: '승인/반려일',
  })
  @Expose()
  get approvalDate(): Date {
    return this._approvalDate;
  }
  @ApiProperty({
    example: '2023-01-01 10:00:00',
    description: '최종 작성일',
  })
  @Expose()
  get finalWriteredAt(): Date {
    return this._finalWriteredAt;
  }
  @ApiProperty({
    example: 10,
    description: '조회수',
  })
  @Expose()
  get viewCount(): number {
    return this._viewCount;
  }

  @ApiProperty({
    example: 10,
    description: '댓글수',
  })
  @Expose()
  get commentCnt(): number {
    return 10;
  }

  @ApiProperty({
    example: 5,
    description: '좋아요',
  })
  @Expose()
  get like(): number {
    return 5;
  }
}
