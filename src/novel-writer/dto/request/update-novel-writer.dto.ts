import { PickType, ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { NovelWirterDto } from '../novel-writer.dto';
import { userEntity } from '../../../user/entities/user.entity';
import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { NovelTextEntity } from '../../../novel-text/entities/novel-text.entity';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';

export class UpdateNovelWriterRequestDto extends PickType(NovelWirterDto, [
  'status',
  'name',
  'novelRoomId',
]) {
  @ApiProperty({
    example: '글 Id',
    description: '해당 유저의 임시 저장이 된 글 Id',
  })
  @IsNumber()
  id: number;

  toEntity(user: userEntity): Partial<NovelWriterEntity> {
    const entity = NovelWriterEntity.of(this.novelRoomId, this.status, user);
    return entity;
  }
}
