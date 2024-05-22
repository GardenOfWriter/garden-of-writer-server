import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Put, Query, SerializeOptions, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { Param } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { ChangeWriterSeqRequestDto } from './dto/request/change-writer-seq.dto';
import { CreateNovelWriterDto } from './dto/request/create-novel-writer.dto';
import { WriterCategoryEnum } from './entities/enums/writer-category.enum';
import { WriterStatusEnum } from './entities/enums/writer-status.enum';
import { NovelWriterService } from './novel-writer.service';
import { ApplyNovelRoomWriter, ChangeWriterSeqRequest, ExitWriter, FindWriter } from './decorator/swagger.decorator';

@ApiTags('작가 리스트 [피그마 5번 작가 관련]')
@Controller('writer')
@ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
@UseGuards(JwtGuard)
export class NovelWriterController {
  constructor(private novelWriterService: NovelWriterService) {}

  /**
   * 소설 공방에 참여한 작가 리스트
   */
  @FindWriter()
  @Get('')
  async findNovelWirters(@Query('novelRoomId') novelRoomId: number, @CurrentUser() user: UserEntity) {
    return await this.novelWriterService.findByNoveRoomId(novelRoomId, user);
  }
  /**
   * 소설 공방에 참여 신청
   */
  @ApplyNovelRoomWriter()
  @Post('/novel-room/approval')
  create(@CurrentUser() user: UserEntity, @Body() dto: CreateNovelWriterDto) {
    const writer = dto.toEntity(user, WriterCategoryEnum.ATTENDEE, WriterStatusEnum.REVIEW);
    return this.novelWriterService.create(writer);
  }

  /**
   * 작가 순서 변경
   */
  @ChangeWriterSeqRequest()
  @Put('/sequence')
  async changePriorty(@Body() dto: ChangeWriterSeqRequestDto, @CurrentUser() user: UserEntity) {
    return await this.novelWriterService.changeWriterSeq(dto, user);
  }
  /**
   *  작가 퇴출
   */
  @ExitWriter()
  @Patch('/exit/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.novelWriterService.exitWriter(id);
  }
}
