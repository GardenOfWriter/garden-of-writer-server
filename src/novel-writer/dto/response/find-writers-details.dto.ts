import { Expose } from 'class-transformer';
import { NovelWriterEntity } from '../../entities/novel-writer.entity';
import { NovelWriterStatusType } from '@app/novel-writer/entities/enums/novel-writer-status.enum';
import { userEntity } from '@app/user/entities/user.entity';
import { NovelWriterCategoryType } from '@app/novel-writer/entities/enums/novel-writer-category.enum';
import { ApiProperty } from '@nestjs/swagger';
import { NovelWriterCategoryEnum } from '../../entities/enums/novel-writer-category.enum';

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

  @ApiProperty({
    example: 1,
    description: '작가 row Id',
  })
  @Expose({ name: 'id' })
  get id(): number {
    return this._id;
  }
  @ApiProperty({
    example: 1,
    description: '유저 row Id',
  })
  @Expose({ name: 'userId' })
  get userId(): number {
    return this._user.id;
  }
  @ApiProperty({
    enum: NovelWriterCategoryEnum,
    example: true,
    description: `${NovelWriterCategoryEnum.PARTICIPATING_WRITER} : 참여 작가, ${NovelWriterCategoryEnum.REPRESENTATIVE_WRITER} : 대표작가`,
  })
  @Expose({ name: 'category' })
  get category(): NovelWriterCategoryType {
    return this._category;
  }
  @ApiProperty({
    example: '',
    description: '',
  })
  @Expose({ name: 'status' })
  get status(): NovelWriterStatusType {
    return this._status;
  }
  @ApiProperty({
    example: '',
    description: '',
  })
  @Expose({ name: 'nickname' })
  get nickname(): string {
    return this._user.nickname;
  }
  @ApiProperty({
    example: '',
    description: '',
  })
  @Expose()
  get createdAt(): Date {
    return this._createdAt;
  }
  @ApiProperty({
    example: '',
    description: '',
  })
  @Expose()
  get notifiedAt(): Date {
    return this._notifiedAt;
  }
  @ApiProperty({
    example: '',
    description: '',
  })
  @Expose()
  get exitAt(): Date {
    return this._exitAt;
  }
}
