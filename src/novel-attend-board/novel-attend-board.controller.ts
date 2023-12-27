import { JwtGuard } from '@app/auth/guard/jwt.guard';
import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { TransactionInterceptor } from '@app/commons/interceptor/transaction.interceptor';
import {
  Body,
  Controller,
  Get,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { userEntity } from '../user/entities/user.entity';
import { CreateNovelAttnedBoardDto } from './dto/request/create-board.dto';
import { NovelAttendBoardService } from './novel-attend-board.service';

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
