import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { Param } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { userEntity } from '../user/entities/user.entity';
import { CreateNovelWriterRequestDto } from './dto/request/create-novel-writer.dto';
import { NovelWriterCategoryEnum } from './entities/enums/novel-writer-category.enum';
import { NovelWriterStatusEnum } from './entities/enums/novel-writer-status.enum';
import { NovelWriterService } from './novel-writer.service';
import { FindWriter } from './decorator/find-writer.decorator';
import { ChangeWriterSeqRequestDto } from './dto/request/change-writer-seq.dto';

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
  async findNovelWirters(@Query('novelRoomId') novelRoomId: number) {
    return await this.novelWriterService.findByNoveRoomId(novelRoomId);
  }

  @ApiOperation({
    summary: '소설 공방에 참여 작가로 참여 신청',
  })
  @Post('join')
  create(
    @CurrentUser() user: userEntity,
    @Body() dto: CreateNovelWriterRequestDto,
  ) {
    return this.novelWriterService.create(
      dto.toEntity(
        user,
        NovelWriterCategoryEnum.PARTICIPATING_WRITER,
        NovelWriterStatusEnum.ATTENDING_REVIEW,
      ),
    );
  }

  @ApiOperation({
    summary: '작가 순서 변경',
  })
  @Post('change-seq')
  async changePriorty(
    @Body() dto: ChangeWriterSeqRequestDto,
    @CurrentUser() user: userEntity,
  ) {
    return await this.novelWriterService.changeWriterSeq(dto);
  }

  @ApiOperation({
    summary: '소설 참여 작가 퇴장 API ',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.novelWriterService.delete(id);
  }
}
