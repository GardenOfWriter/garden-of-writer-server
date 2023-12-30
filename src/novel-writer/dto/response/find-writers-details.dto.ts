import { Expose } from 'class-transformer';
import { NovelWriterEntity } from '../../entities/novel-writer.entity';
import { NovelWriterStatusType } from '@app/novel-writer/entities/enums/novel-writer-status.enum';
import { userEntity } from '@app/user/entities/user.entity';
import { NovelWriterCategoryType } from '@app/novel-writer/entities/enums/novel-writer-category.enum';

export class FindByNovelWriterDetails {
  private _status: NovelWriterStatusType;
  private _category: NovelWriterCategoryType;
  private _createdAt: Date;
  private _notifiedAt: Date;
  private _user: userEntity;
  private _exitAt: Date;
  private _id: number;

  constructor(writer: NovelWriterEntity) {
    this._id = writer.id;
    this._category = writer.category;
    this._status = writer.status;
    this._user = writer.user;
    this._createdAt = writer.createdAt;
    this._notifiedAt = writer.notifiedAt;
    this._exitAt = writer.exitedAt;
  }

  @Expose({ name: 'id' })
  get id(): number {
    return this._id;
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
  get createdAt(): Date {
    return this._createdAt;
  }
  @Expose()
  get notifiedAt(): Date {
    return this._notifiedAt;
  }
  @Expose()
  get exitAt(): Date {
    return this._exitAt;
  }
}
