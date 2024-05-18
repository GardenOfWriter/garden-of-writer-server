import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { UserEntity } from '../../../user/entities/user.entity';
import { ChapterDto } from '../chapter.dto';

export class UpdateChapterRequestDto extends PickType(ChapterDto, ['status', 'title', 'novelRoomId']) {
  @ApiProperty({
    example: '글 Id',
    description: '해당 유저의 임시 저장이 된 글 Id',
  })
  @IsNumber()
  id: number;

  toEntity(user: UserEntity): Partial<ChapterEntity> {
    const entity = ChapterEntity.of(this.novelRoomId, this.status, user, this.title);
    return entity;
  }
}
