import {
  Body,
  Controller,
  Post,
  Put,
  Query,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNovel } from './decorator/create-novel.decorator';
import { CreateNovelTextRequestDto } from './dto/request/create-novel.dto';
import { UpdateTextNovelRequestDto } from './dto/request/update-novel.dto';
import { NovelTextService } from './novel-text.service';

@ApiTags('소설글쓰기')
@Controller('novel-text')
export class NovelTextController {
  constructor(private novelTextService: NovelTextService) {}
  @ApiOperation({
    summary: '해당 회차 소설 글쓰기 정보 조회하기',
  })
  @Get('')
  async findNovelText(@Query('chapter_id') chapterId: number) {
    return await this.novelTextService.findChapterText(chapterId);
  }

  @CreateNovel()
  @Post('')
  create(@Body() dto: CreateNovelTextRequestDto) {
    return this.novelTextService.create(dto);
  }

  @ApiOperation({
    summary: '소설 글쓰기 수정 하기 API ',
  })
  @Put('')
  update(@Body() dto: UpdateTextNovelRequestDto) {}

  @Delete(':id')
  delete() {}
}
