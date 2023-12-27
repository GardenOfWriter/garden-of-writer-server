import { Expose } from 'class-transformer';
import { NovelWriterEntity } from '../../entities/novel-writer.entity';
import { NovelWriterStatusType } from '@app/novel-writer/entities/enums/novel-writer-status.enum';
import { userEntity } from '@app/user/entities/user.entity';
import { NovelWriterCategoryType } from '@app/novel-writer/entities/enums/novel-writer-category.enum';

export class FindByNovelWriterDetails {
  private _status: NovelWriterStatusType;
  private _category: NovelWriterCategoryType;
  private _createdAt: Date;
  private _attendedAt: Date;
  private _notifiedAt: Date;
  private _user: userEntity;

  constructor(writer: NovelWriterEntity) {
    this._category = writer.category;
    this._status = writer.status;
    this._user = writer.user;
    this._attendedAt = writer.attendedAt;
    this._createdAt = writer.createdAt;
    this._notifiedAt = writer.notifiedAt;
  }

  @Expose({ name: 'userId' })
  get userId(): number {
    return this._user.id;
  }
  @Expose({ name: 'category' })
  get category(): NovelWriterCategoryType {
    return this._category;
  }
  @Expose({ name: 'status' })
  get status(): NovelWriterStatusType {
    return this._status;
  }
  @Expose({ name: 'nickname' })
  get nickname(): string {
    return this._user.nickname;
  }
  @Expose()
  get attendingAt(): Date {
    return this._attendedAt;
  }
  @Expose()
  get createdAt(): Date {
    return this._createdAt;
  }
  @Expose()
  get notifiedAt(): Date {
    return this._notifiedAt;
  }
}
