import { NovelTextStatusType } from '@app/novel-text/entities/enum/novel-text-status.enum';
import { SerializeOptions } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { NovelTextEntity } from '../../entities/novel-text.entity';

export class FindByChapterIdResponseDto {
  private _id: number;
  private _chapterId: number;
  private _status: NovelTextStatusType;
  private _content: string;
  constructor(entity: NovelTextEntity) {
    this._id = entity.id;
    this._chapterId = entity.chapterId;
    this._status = entity.status;
    this._content = entity.content;
  }

  @Expose()
  get id(): number {
    return this._id;
  }
  @Expose()
  get chapterId(): number {
    return this._chapterId;
  }
  @Expose()
  get status(): NovelTextStatusType {
    return this._status;
  }
  @Expose()
  get content(): string {
    return this._content;
  }
}
