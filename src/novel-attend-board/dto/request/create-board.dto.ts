import { PickType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { NovelAttnedBoardDto } from '../novel-attend-board.dto';
import { NovelAttendBoardEntity } from '../../entities/novel-attend-board.entity';

export class CreateNovelAttnedBoardDto extends PickType(NovelAttnedBoardDto, [
  'novelRoomId',
  'content',
  'openKakaoLink',
  'title',
]) {
  toEntity(): Partial<NovelAttendBoardEntity> {
    return NovelAttendBoardEntity.of(
      this.novelRoomId,
      this.title,
      this.content,
      this.openKakaoLink,
    );
  }
}
