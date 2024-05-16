import { UserEntity } from '@app/user/entities/user.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { NovelTextEntity } from '../../entities/novel-text.entity';
import { NovelTextDto } from '../novel-text.dto';
import { IsNumber } from 'class-validator';

export class CreateNovelTextRequestDto extends PickType(NovelTextDto, [
  'status',
  'content',
  'chapterId',
]) {
  @ApiProperty({
    example: 1,
    description: '공방 고유 ID',
  })
  @IsNumber()
  novelRoomId: number;

  toEntity(user: UserEntity): Partial<NovelTextEntity> {
    const entity = NovelTextEntity.of(
      this.chapterId,
      this.status,
      this.content,
      user,
    );
    return entity;
  }
}
