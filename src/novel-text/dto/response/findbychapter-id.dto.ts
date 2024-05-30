import { NovelTextStatusDescription, NovelTextStatusType } from '@app/novel-text/entities/enum/novel-text-status.enum';
import { Expose } from 'class-transformer';
import { NovelTextEntity } from '../../entities/novel-text.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FindByChapterIdResponseDto {
  private _id: number;
  private _chapterId: number;
  private _status: NovelTextStatusType;
  private _content: string;
  constructor(entity: NovelTextEntity) {
    this._id = entity.id;
    this._chapterId = +entity.chapterId;
    this._status = entity.status;
    this._content = entity.content;
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
}
