import { NovelTextStatusDescription, NovelTextStatusType } from '@app/novel-text/entities/enum/novel-text-status.enum';
import { Expose } from 'class-transformer';
import { NovelTextEntity } from '../../entities/novel-text.entity';
import { ApiProperty } from '@nestjs/swagger';
import { convertDayFormat } from '../../../commons/util/date.util';
import { UserEntity } from '@app/user/entities/user.entity';
import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { isEmpty } from '../../../commons/util/data.helper';

export class FindByChapterIdResponseDto {
  private _chapterItems: ChapterItemsDto[];
  private _latestChapter: ChapterEntity;

  constructor(entity: NovelTextEntity[], latestChapter: ChapterEntity) {
    this._chapterItems = entity.map((e) => new ChapterItemsDto(e));
    this._latestChapter = latestChapter;
  }

  @ApiProperty({
    example: true,
    description: '다음 회차 생성 가능 여부',
  })
  @Expose()
  get isNextEnable(): boolean {
    return isEmpty(this._latestChapter) ? false : true;
  }

  @ApiProperty({
    example: {
      id: 1,
      chapterId: 1,
      status: 1,
      content: 'this is content',
      createdAt: '2021-01-01 00:00:00',
      updatedAt: '2021-01-01 00:00:00',
    },
    description: '소설 글쓰기 상세',
  })
  @Expose()
  get texts(): ChapterItemsDto[] {
    return this._chapterItems;
  }
}

export class ChapterItemsDto {
  private _id: number;
  private _chapterId: number;
  private _status: NovelTextStatusType;
  private _content: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _user: UserEntity;

  constructor(entity: NovelTextEntity) {
    this._id = entity.id;
    this._chapterId = +entity.chapterId;
    this._status = entity.status;
    this._content = entity.content;
    this._createdAt = entity.createdAt;
    this._updatedAt = entity.updatedAt;
    this._user = entity.createdBy;
  }

  @ApiProperty({
    example: 1,
    description: '소설 글쓰기 ID (textId) websocket response로 받은 id로 사용',
  })
  @Expose()
  get id(): number {
    return this._id;
  }
  @ApiProperty({
    example: 1,
    description: '회차 ID',
  })
  @Expose()
  get chapterId(): number {
    return this._chapterId;
  }
  @ApiProperty({
    ...NovelTextStatusDescription,
  })
  @Expose()
  get status(): NovelTextStatusType {
    return this._status;
  }
  @ApiProperty({
    example: '소설 글쓰기 내용',
    description: '소설 글쓰기 내용',
  })
  @Expose()
  get content(): string {
    return this._content;
  }
  @ApiProperty({
    example: { userId: 1, nickname: 'test@test.com' },
    description: '작성자',
  })
  @Expose()
  get createdBy(): { userId: number; nickname: string } {
    return {
      userId: this._user.id,
      nickname: this._user.nickname,
    };
  }

  @ApiProperty({
    example: convertDayFormat(new Date()),
    description: '등록 날짜',
  })
  @Expose()
  get createdAt(): string {
    return convertDayFormat(this._createdAt);
  }

  @ApiProperty({
    example: convertDayFormat(new Date()),
    description: '수정 날짜',
  })
  @Expose()
  get updatedAt(): string {
    return convertDayFormat(this._updatedAt);
  }
}
