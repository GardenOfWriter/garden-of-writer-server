import { WriterCategoryType } from '@app/novel-writer/entities/enums/writer-category.enum';
import { WriterStatusType } from '@app/novel-writer/entities/enums/writer-status.enum';
import { UserEntity } from '@app/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { WriterCategoryDescription } from '../../entities/enums/writer-category.enum';
import { NovelWriterEntity } from '../../entities/novel-writer.entity';
import { WriterStatusDescription } from '../../entities/enums/writer-status.enum';
import { getToDayISO8601 } from '@app/commons/util/date.util';

export class FindByNovelWriterDetails {
  private _status: WriterStatusType;
  private _category: WriterCategoryType;
  private _user: UserEntity;
  private _createdAt: Date;
  private _notifiedAt: Date;
  private _exitAt: Date;
  private _id: number;

  constructor(writer: NovelWriterEntity) {
    this._id = writer.id;
    this._user = writer.user;
    this._category = writer.category;
    this._status = writer.status;

    this._createdAt = writer.createdAt;
    this._notifiedAt = writer.notifiedAt;
    this._exitAt = writer.exitedAt;
  }

  @ApiProperty({
    example: 1,
    description: '참여 작가 Id',
  })
  @Expose({ name: 'id' })
  get id(): number {
    return this._id;
  }
  @ApiProperty({
    example: { id: 1, nickname: '닉네임' },
    description: 'userId : 유저 ID , nickname : 유저 닉네임',
  })
  @Expose({ name: 'user' })
  get user(): { id: number; nickname: string } {
    return {
      id: this._user.id,
      nickname: this._user.nickname,
    };
  }
  @ApiProperty({ ...WriterCategoryDescription })
  @Expose({ name: 'category' })
  get category(): WriterCategoryType {
    return this._category;
  }
  @ApiProperty({
    ...WriterStatusDescription,
  })
  @Expose({ name: 'status' })
  get status(): WriterStatusType {
    return this._status;
  }

  @ApiProperty({
    example: getToDayISO8601(),
    description: '참여신청일',
  })
  @Expose()
  get createdAt(): Date {
    return this._createdAt;
  }
  @ApiProperty({
    example: getToDayISO8601(),
    description: '참여 승인/반려일',
  })
  @Expose()
  get notifiedAt(): Date {
    return this._notifiedAt;
  }
  @ApiProperty({
    example: getToDayISO8601(),
    description: '퇴장일',
  })
  @Expose()
  get exitAt(): Date {
    return this._exitAt;
  }
}
