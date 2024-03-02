import {
  WriterCategoryEnum,
  WriterCategoryType,
} from '@app/novel-writer/entities/enums/writer-category.enum';
import { WriterStatusType } from '@app/novel-writer/entities/enums/writer-status.enum';
import { UserEntity } from '@app/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  WriterStatusEnum,
  WriterStatusDescription,
} from '../../entities/enums/writer-status.enum';
import { NovelWriterEntity } from '../../entities/novel-writer.entity';
import { WriterCategoryDescription } from '../../entities/enums/writer-category.enum';

export class FindByNovelRoomIdResponseDto {
  private _status: WriterStatusType;
  private _user: UserEntity;
  private _category: WriterCategoryType;
  private _id: number;
  private _writingSeq: number;
  private _currentlyWriting: boolean;
  constructor(entity: NovelWriterEntity) {
    this._id = entity.id;
    this._status = entity.status;
    this._user = entity.user;
    this._category = entity.category;
    this._writingSeq = entity.writingSeq;
    this._currentlyWriting = entity.currentlyWriting;
  }
  @ApiProperty({
    example: 1,
    description: '소설 공방 작가 ID',
  })
  @Expose()
  get id(): number {
    return this._id;
  }
  @ApiProperty({
    example: 1,
    description: '작가 순서',
  })
  @Expose()
  get writingSeq(): number {
    return this._writingSeq;
  }
  @ApiProperty({
    example: true,
    description: '현재 순서 여부 (true: 현재 작성 순서, false: 작성순서 아님)',
  })
  @Expose()
  get currentlyWriting(): boolean {
    return this._currentlyWriting;
  }
  @ApiProperty({ ...WriterStatusDescription })
  @Expose()
  get status(): WriterStatusType {
    return this._status;
  }

  @ApiProperty({
    example: '작가 1',
    description: '작가 닉네임',
  })
  @Expose()
  get nickname(): string {
    return this._user.nickname;
  }
  @ApiProperty({ ...WriterCategoryDescription })
  @Expose()
  get category(): string {
    return this._category;
  }
}
