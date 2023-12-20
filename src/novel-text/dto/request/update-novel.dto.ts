import { PickType, ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { NovelTextEntity } from '../../entities/novel-text.entity';
import { NovelTextDto } from '../novel-text.dto';
import { userEntity } from '../../../user/entities/user.entity';

export class UpdateTextNovelRequestDto extends PickType(NovelTextDto, [
  'status',
  'content',
  'chapterId',
]) {
  @ApiProperty({
    example: '글 Id',
    description: '해당 유저의 임시 저장이 된 글 Id',
  })
  @IsNumber()
  id: number;

  toEntity(user: userEntity): Partial<NovelTextEntity> {
    const entity = NovelTextEntity.of(
      this.chapterId,
      this.status,
      this.content,
      user,
    );

    return entity;
  }
}
