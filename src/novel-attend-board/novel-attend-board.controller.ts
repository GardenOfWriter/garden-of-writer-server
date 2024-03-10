import { JwtGuard } from '@app/auth/guard/jwt.guard';
import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { TransactionInterceptor } from '@app/commons/interceptor/transaction.interceptor';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../user/entities/user.entity';
import {
  CreateNovelAttendBoard,
  FindNovelAttendBoard,
} from './decorator/novel-attend-board.swagger';
import { CreateNovelAttnedBoardDto } from './dto/request/create-board.dto';
import { NovelAttendBoardService } from './novel-attend-board.service';
import { FindAttendBoardDto } from './dto/request/find-attend-board.dto';

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
    return this.novelAttendBoardService.findAll(user);
  }
}
