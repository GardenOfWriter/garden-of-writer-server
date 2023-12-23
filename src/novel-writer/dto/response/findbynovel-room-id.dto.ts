import { SerializeOptions } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { ChapterStatusType } from '@app/chapter/entities/enum/chapter-status.enum';
import { NovelWriterEntity } from '../../entities/novel-writer.entity';
import { NovelWriterStatusType } from '@app/novel-writer/entities/enums/novel-writer.enum';
import { userEntity } from '@app/user/entities/user.entity';

@SerializeOptions({
  excludePrefixes: ['_'],
})
export class FindByNovelRoomIdResponseDto {
  private _novelRoomId: number;
  private _status: NovelWriterStatusType;
  private _user: userEntity;
  constructor(entity: NovelWriterEntity) {
    this._status = entity.status;
    this._user = entity.user;
  }

  @Expose()
  get chapterId(): number {
    return this._novelRoomId;
  }
  @Expose()
  get status(): NovelWriterStatusType {
    return this._status;
  }
  @Expose()
  get nickname(): string {
    return this._user.nickname;
  }
}
