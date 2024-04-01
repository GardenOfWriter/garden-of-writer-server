import { JwtGuard } from '@app/auth/guard/jwt.guard';
import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../user/entities/user.entity';
import {
  CreateBoardLike,
  FindDetailBoard,
  FindNovelAttendBoard,
} from './decorator/novel-attend-board.swagger';
import { NovelAttendBoardService } from './novel-attend-board.service';
import { FindAttendBoardDto } from './dto/request/find-attend-board.dto';
import { CreateBoardLikeDto } from './dto/request/create-board-like.dto';

@ApiTags('소설공방참여 게시글')
@Controller('novel-attend-board')
@ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
@UseGuards(JwtGuard)
@Controller()
export class NovelAttendBoardController {
  constructor(private novelAttendBoardService: NovelAttendBoardService) {}
  @FindNovelAttendBoard()
  @Get('')
  findAll(@Query() dto: FindAttendBoardDto, @CurrentUser() user: UserEntity) {
    return this.novelAttendBoardService.findAll(dto, user);
  }

  @FindDetailBoard()
  @Get(':roomId')
  async findByIdDetail(
    @Param('roomId', ParseIntPipe) roomId: number,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.novelAttendBoardService.findById(roomId, user);
  }

  @CreateBoardLike()
  @Post('like')
  async boardLike(
    @CurrentUser() user: UserEntity,
    @Body() dto: CreateBoardLikeDto,
  ) {
    return await this.novelAttendBoardService.createBoardLike(dto, user);
  }
}
