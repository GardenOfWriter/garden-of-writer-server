import { SerializeOptions } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { ChapterStatusType } from '@app/chapter/entities/enums/chapter-status.enum';
import { NovelWriterEntity } from '../../entities/novel-writer.entity';
import { NovelWriterStatusType } from '@app/novel-writer/entities/enums/novel-writer-status.enum';
import { userEntity } from '@app/user/entities/user.entity';
import {
  NovelWriterCategoryEnum,
  NovelWriterCategoryType,
} from '@app/novel-writer/entities/enums/novel-writer-category.enum';
import { ApiProperty } from '@nestjs/swagger';
import { NovelWriterStatusEnum } from '../../entities/enums/novel-writer-status.enum';

@SerializeOptions({
  excludePrefixes: ['_'],
})
export class FindByNovelRoomIdResponseDto {
  private _status: NovelWriterStatusType;
  private _user: userEntity;
  private _category: NovelWriterCategoryType;
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
  @ApiProperty({
    enum: NovelWriterStatusEnum,
    example: true,
    description: `${NovelWriterStatusEnum.ATTENDING} : 참여중,
                  ${NovelWriterStatusEnum.ATTENDING_REJECT} : 참여 반려,
                  ${NovelWriterStatusEnum.ATTENDING_REVIEW} : 참여 검토,
                  ${NovelWriterStatusEnum.EXIT} : 퇴장`,
  })
  @Expose()
  get status(): NovelWriterStatusType {
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
  @ApiProperty({
    enum: NovelWriterCategoryEnum,
    example: true,
    description: `${NovelWriterCategoryEnum.PARTICIPATING_WRITER} : 참여 작가, ${NovelWriterCategoryEnum.REPRESENTATIVE_WRITER} : 대표작가`,
  })
  @Expose()
  get category(): string {
    return this._category;
  }
}
