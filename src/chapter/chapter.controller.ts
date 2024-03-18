import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNovel } from './decorator/create-chapter.decorator';
import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { Param } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { ChapterService } from './chapter.service';
import { FindChapter } from './decorator/find-chapter.decorator';
import { ApplyChapterDto } from './dto/request/apply-chapter.dto';
import { ChangeTitleDto } from './dto/request/change-title.dto';
import { CreateChapterRequestDto } from './dto/request/create-chapter.dto';
import { FindByNovelRoomIdDto } from './dto/request/findby-novel-room-id.dto';

@ApiTags('소설 회차')
@Controller('chapter')
@ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
@UseGuards(JwtGuard)
export class ChapterController {
  constructor(private chapterService: ChapterService) {}

  @FindChapter()
  @Get('')
  async findChpater(@Query() dto: FindByNovelRoomIdDto) {
    return await this.chapterService.findChapterText(dto);
  }

  @CreateNovel()
  @Post('')
  create(
    @CurrentUser() user: UserEntity,
    @Body() dto: CreateChapterRequestDto,
  ) {
    return this.chapterService.save(dto.toEntity(user));
  }

  @ApiOperation({
    summary: '회차 연재 승인 신청하기',
  })
  @Put('/approval/:id')
  applyChapter(@Param() dto: ApplyChapterDto, @CurrentUser() user: UserEntity) {
    return this.chapterService.applyChapter(dto.id);
  }
  @ApiOperation({
    summary: '회차 제목 수정하기',
  })
  @Put('/title/:id')
  change(@Param('id', ParseIntPipe) id: number, @Body() dto: ChangeTitleDto) {
    return this.chapterService.changeTitle(id, dto);
  }
}
