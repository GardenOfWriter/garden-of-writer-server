import { Body, Controller, Post, Put, Query, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNovel } from './decorator/create-novel.decorator';
import { CreateNovelRequestDto } from './dto/request/create-novel.dto';
import { NovelService } from './novel.service';

@ApiTags('소설글쓰기')
@Controller('novel')
export class NovelController {
  constructor(private novelService: NovelService) {}
  @ApiOperation({
    summary: '해당 회차 소설 글쓰기 정보 조회하기',
  })
  @Get('')
  findNovel(@Query('chapter_id') chapterId: number) {}

  @CreateNovel()
  @Post('')
  create(@Body() dto: CreateNovelRequestDto) {
    return this.novelService.addRow(dto);
  }

  @ApiOperation({
    summary: '소설 글쓰기 수정 하기 API ',
  })
  @Put('')
  update(@Body() dto: CreateNovelRequestDto) {}
}
