import {
  Body,
  Controller,
  Post,
  Put,
  Query,
  Get,
  Delete,
  UseGuards,
  ParseIntPipe,
  SerializeOptions,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNovel } from './decorator/create-chapter.decorator';

import { JwtGuard } from '../auth/guard/jwt.guard';
import { CurrentUser } from '@app/commons/decorator/current-user.decorater';
import { userEntity } from '../user/entities/user.entity';
import { Param } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterRequestDto } from './dto/request/create-chapter.dto';
import { UpdateChapterRequestDto } from './dto/request/update-chapter.dto';

@ApiTags('소설 회차')
@Controller('chapter')
@ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
@UseGuards(JwtGuard)
export class ChapterController {
  constructor(private chapterService: ChapterService) {}

  @ApiOperation({
    summary: '해당 회차 소설 글쓰기 정보 조회하기',
  })
  @Get('')
  async findNovelText(@Query('chapter_id') chapterId: number) {
    return await this.chapterService.findChapterText(chapterId);
  }

  @CreateNovel()
  @Post('')
  create(
    @CurrentUser() user: userEntity,
    @Body() dto: CreateChapterRequestDto,
  ) {
    return this.chapterService.create(dto.toEntity(user));
  }

  @ApiOperation({
    summary: '소설 글쓰기 수정 하기 API ',
  })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id,
    @CurrentUser() user: userEntity,
    @Body() dto: UpdateChapterRequestDto,
  ) {
    return this.chapterService.update(id, dto.toEntity(user));
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: userEntity,
  ) {
    return await this.chapterService.delete(id);
  }
}
