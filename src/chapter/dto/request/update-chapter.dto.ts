import { PickType, ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ChapterDto } from '../chapter.dto';
import { userEntity } from '../../../user/entities/user.entity';
import { ChapterEntity } from '@app/chapter/entities/chapter.entity';

export class UpdateChapterRequestDto extends PickType(ChapterDto, [
  'status',
  'title',
  'novelRoomId',
]) {
  @ApiProperty({
    example: '글 Id',
    description: '해당 유저의 임시 저장이 된 글 Id',
  })
  @IsNumber()
  id: number;

  toEntity(user: userEntity): Partial<ChapterEntity> {
    const entity = ChapterEntity.of(
      this.novelRoomId,
      this.status,
      this.title,
      user,
    );
    return entity;
  }
}
