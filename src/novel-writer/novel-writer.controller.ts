import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { Param } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { FindWriter } from './decorator/find-writer.decorator';
import { ChangeWriterSeqRequestDto } from './dto/request/change-writer-seq.dto';
import { CreateNovelWriterDto } from './dto/request/create-novel-writer.dto';
import { WriterCategoryEnum } from './entities/enums/writer-category.enum';
import { WriterStatusEnum } from './entities/enums/writer-status.enum';
import { NovelWriterService } from './novel-writer.service';

@ApiTags('작가 리스트')
@Controller('writer')
@ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
@UseGuards(JwtGuard)
export class NovelWriterController {
  constructor(private novelWriterService: NovelWriterService) {}

  @FindWriter()
  @Get('')
  async findNovelWirters(
    @Query('novelRoomId') novelRoomId: number,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.novelWriterService.findByNoveRoomId(novelRoomId, user);
  }

  @ApiOperation({
    summary: '소설 공방에 참여 작가로 참여 신청',
  })
  @Post('/novel-room/approval')
  create(@CurrentUser() user: UserEntity, @Body() dto: CreateNovelWriterDto) {
    const writer = dto.toEntity(
      user,
      WriterCategoryEnum.HOST,
      WriterStatusEnum.REVIEW,
    );
    return this.novelWriterService.create(writer);
  }

  @ApiOperation({
    summary: '작가 순서 변경',
  })
  @Put('/sequence')
  async changePriorty(
    @Body() dto: ChangeWriterSeqRequestDto,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.novelWriterService.changeWriterSeq(dto, user);
  }

  @ApiOperation({
    summary: '소설 참여 작가 퇴장 API ',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.novelWriterService.delete(id);
  }
}
