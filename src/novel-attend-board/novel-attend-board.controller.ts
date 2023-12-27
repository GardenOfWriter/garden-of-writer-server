import { JwtGuard } from '@app/auth/guard/jwt.guard';
import { TransactionInterceptor } from '@app/commons/interceptor/transaction.interceptor';
import {
  Controller,
  Get,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NovelAttendBoardService } from './novel-attend-board.service';
import { Body } from '@nestjs/common';
import { NovelAttnedBoardDto } from './dto/novel-attend-board.dto';
import { CurrentUser } from '@app/commons/decorator/current-user.decorater';
import { userEntity } from '../user/entities/user.entity';
import { CreateNovelAttnedBoardDto } from './dto/request/create-board.dto';

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

  @Get('')
  findAll(@CurrentUser() user: userEntity) {
    return this.novelAttendBoardService.findAll(user);
  }

  @UseInterceptors(TransactionInterceptor)
  @Post('')
  create(@Body() dto: CreateNovelAttnedBoardDto) {
    return this.novelAttendBoardService.create(dto.toEntity());
  }
}
