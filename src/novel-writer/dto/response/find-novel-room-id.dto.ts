import { SerializeOptions } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { ChapterStatusType } from '@app/chapter/entities/enums/chapter-status.enum';
import { NovelWriterEntity } from '../../entities/novel-writer.entity';
import { NovelWriterStatusType } from '@app/novel-writer/entities/enums/novel-writer-status.enum';
import { userEntity } from '@app/user/entities/user.entity';

@SerializeOptions({
  excludePrefixes: ['_'],
})
export class FindByNovelRoomIdResponseDto {
  private _status: NovelWriterStatusType;
  private _user: userEntity;
  constructor(entity: NovelWriterEntity) {
    this._status = entity.status;
    this._user = entity.user;
  }

  @Expose({ name: 'status' })
  get status(): NovelWriterStatusType {
    return this._status;
  }
  @Expose({ name: 'nickname' })
  get nickname(): string {
    return this._user.nickname;
  }
}
