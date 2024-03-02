import { WriterCategoryType } from '@app/novel-writer/entities/enums/writer-category.enum';
import { WriterStatusType } from '@app/novel-writer/entities/enums/writer-status.enum';
import { UserEntity } from '@app/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  WriterCategoryEnum,
  WriterCategoryDescription,
} from '../../entities/enums/writer-category.enum';
import { NovelWriterEntity } from '../../entities/novel-writer.entity';

export class FindByNovelWriterDetails {
  private _status: WriterStatusType;
  private _category: WriterCategoryType;
  private _createdAt: Date;
  private _notifiedAt: Date;
  private _user: UserEntity;
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
    description: '참여 작가 row Id',
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
  @ApiProperty({ ...WriterCategoryDescription })
  @Expose({ name: 'category' })
  get category(): WriterCategoryType {
    return this._category;
  }
  @ApiProperty({
    example: '',
    description: '',
  })
  @Expose({ name: 'status' })
  get status(): WriterStatusType {
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
