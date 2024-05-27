import { WriterCategoryType } from '@app/novel-writer/entities/enums/writer-category.enum';
import { WriterStatusType } from '@app/novel-writer/entities/enums/writer-status.enum';
import { UserEntity } from '@app/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { WriterStatusDescription } from '../../entities/enums/writer-status.enum';
import { NovelWriterEntity } from '../../entities/novel-writer.entity';
import { WriterCategoryDescription } from '../../entities/enums/writer-category.enum';
import { FindNovelRoomWritersDto } from './find-novel-room-writers.dto';

export class FindNovelRoomResponseDto {
  private _writers: FindNovelRoomWritersDto[];
  private _nextWriter: string;
  constructor(dto: FindNovelRoomWritersDto[], nextWriter: string) {
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
    return this._nextWriter;
  }
}
