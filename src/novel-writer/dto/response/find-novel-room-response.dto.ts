import { WriterCategoryType } from '@app/novel-writer/entities/enums/writer-category.enum';
import { WriterStatusType } from '@app/novel-writer/entities/enums/writer-status.enum';
import { UserEntity } from '@app/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { WriterStatusDescription } from '../../entities/enums/writer-status.enum';
import { NovelWriterEntity } from '../../entities/novel-writer.entity';
import { WriterCategoryDescription } from '../../entities/enums/writer-category.enum';
import { FindNovelRoomWritersDto } from './find-novel-room-writers.dto';
import { isEmpty } from '../../../commons/util/data.helper';

/**
 * Constructor for FindNovelRoomResponseDto
 * @param {FindNovelRoomWritersDto[]} dto - Array of FindNovelRoomWritersDto
 * @param {NovelWriterEntity} nextWriter - Next writer entity
 */
export class FindNovelRoomResponseDto {
  private _writers: FindNovelRoomWritersDto[];
  private _nextWriter: NovelWriterEntity;

  constructor(dto: FindNovelRoomWritersDto[], nextWriter: NovelWriterEntity) {
    this._writers = dto;
    this._nextWriter = nextWriter;
  }

  @ApiProperty({
    type: [FindNovelRoomWritersDto],
    description: '작가 리스트',
  })
  @Expose()
  get writers(): FindNovelRoomWritersDto[] {
    return this._writers;
  }

  @ApiProperty({
    example: '다음 작가',
    description: '다음 작가',
  })
  @Expose()
  get nextWriter(): string {
    if (isEmpty(this._nextWriter.user)) return '작자 미상';
    return this._nextWriter.user.nickname;
  }
}
