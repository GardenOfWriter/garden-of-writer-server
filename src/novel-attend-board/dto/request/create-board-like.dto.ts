import { BoardLikeEntity } from '@app/novel-attend-board/entities/board-like.entity';
import { NovelAttendBoardEntity } from '@app/novel-attend-board/entities/novel-attend-board.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateBoardLikeDto {
  @ApiProperty({
    example: 1,
    description: '소설 공방 ID',
  })
  @IsNumber()
  novelRoomId: number;

  toBoardLikeEntity(user: UserEntity) {
    return BoardLikeEntity.of(user, this.novelRoomId);
  }
}
