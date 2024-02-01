import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { CreateNovel } from './decorator/create-novel.decorator';
import { CreateNovelTextRequestDto } from './dto/request/create-novel.dto';
import { UpdateTextNovelRequestDto } from './dto/request/update-novel.dto';
import { NovelTextService } from './novel-text.service';

@ApiTags('소설글쓰기')
@Controller('novel-text')
@ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
@UseGuards(JwtGuard)
export class NovelTextController {
  constructor(private novelTextService: NovelTextService) {}

  @ApiOperation({
    summary: '해당 회차 소설 글쓰기 정보 조회하기',
  })
  @Get('')
  async findChpater(@Query('chapterId') chapterId: number) {
    return await this.novelTextService.findChapterText(chapterId);
  }

  @CreateNovel()
  @Post('')
  create(
    @CurrentUser() user: UserEntity,
    @Body() dto: CreateNovelTextRequestDto,
  ) {
    return this.novelTextService.create(dto.toEntity(user));
  }

  @ApiOperation({
    summary: '소설 글쓰기 수정 하기 API ',
  })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id,
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdateTextNovelRequestDto,
  ) {
    return this.novelTextService.update(id, dto.toEntity(user));
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.novelTextService.delete(id, user);
  }
}
