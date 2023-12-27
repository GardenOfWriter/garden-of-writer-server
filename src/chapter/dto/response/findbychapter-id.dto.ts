import { NovelTextStatusType } from '@app/novel-text/entities/enum/novel-text-status.enum';
import { SerializeOptions } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';
import { ChapterEntity } from '../../entities/chapter.entity';
import { ChapterStatusType } from '@app/chapter/entities/enums/chapter-status.enum';

@SerializeOptions({
  excludePrefixes: ['_'],
})
export class FindByNovelRoomIdResponseDto {
  private _id: number;
  private _novelRoomId: number;
  private _status: ChapterStatusType;
  private _name: string;
  constructor(entity: ChapterEntity) {
    this._id = entity.id;
    this._novelRoomId = entity.novelRoom.id;
    this._status = entity.status;
    this._name = entity.name;
  }

  @Expose()
  get id(): number {
    return this._id;
  }
  @Expose()
  get chapterId(): number {
    return this._novelRoomId;
  }
  @Expose()
  get status(): ChapterStatusType {
    return this._status;
  }
  @Expose()
  get content(): string {
    return this._name;
  }
}
