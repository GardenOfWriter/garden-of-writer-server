import { NovelRoomService } from '@app/novel-room/novel-room.service';
import { Controller, SerializeOptions } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('소설 공방 (웹소설 - 7번)')
@Controller('novel-room')
@ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
export class NovelController {
  constructor(private readonly novelRoomService: NovelRoomService) {}

  getNovelList() {}
}
