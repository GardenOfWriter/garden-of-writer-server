import { ChapterStatusEnum, ChapterStatusType } from '@app/chapter/entities/enums/chapter-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ChapterEntity } from '../../entities/chapter.entity';

export class CountChapterLikeResponseDto {
  private _id: number;
  private _no: number;
  private _status: ChapterStatusType;
  private _title: string;
  private _approvalAt: Date;
  private _finalAt: Date;
  private _viewCount: number;

  constructor(entity: ChapterEntity) {
    this._id = entity.id;
    this._status = entity.status;
    this._title = entity.title;
    this._approvalAt = entity.approvalAt;
    this._finalAt = entity.finalAt;
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
    description: '회차 제목명',
  })
  @Expose()
  get title(): string {
    return this._title;
  }

  @ApiProperty({
    example: '2023-01-01 10:00:00',
    description: '연재 승인일',
  })
  @Expose({ name: 'approvalAt' })
  get approvalAt(): Date {
    return this._approvalAt;
  }
  @ApiProperty({
    example: '2023-01-01 10:00:00',
    description: '최종 작성일',
  })
  @Expose({ name: 'finalAt' })
  get finalAt(): Date {
    return this._finalAt;
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
  get commentCount(): number {
    return 0;
  }

  @ApiProperty({
    example: 5,
    description: '좋아요수',
  })
  @Expose()
  get likeCount(): number {
    return 0;
  }
}
