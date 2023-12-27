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
import { UpdateNovelWriterStatusRequestDto } from './dto/request/update-novel-writer-status.dto';
import { NovelWriterCategoryEnum } from './entities/enums/novel-writer-category.enum';
import { NovelWriterStatusEnum } from './entities/enums/novel-writer-status.enum';
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

  @ApiOperation({
    summary: '소설 공방에 참여한 작가 리스트',
  })
  @Get('')
  async findNovelWirters(@Query('novelRoomId') novelRoomId: number) {
    return await this.novelWriterService.findByNoveRoomId(novelRoomId);
  }

  @ApiOperation({
    summary: '소설 공방 작가 관리 메뉴 조회',
  })
  @Get('management')
  async findWriterManagement(
    @CurrentUser() user: userEntity,
    @Query('novelRoomId') novelRoomId: number,
  ) {
    return await this.novelWriterService.findByNovelRoomIdDetails(
      user,
      novelRoomId,
    );
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

  // @ApiOperation({
  //   summary: '소설 글쓰기 수정 하기 API ',
  // })
  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id,
  //   @CurrentUser() user: userEntity,
  //   @Body() dto: UpdateNovelWriterRequestDto,
  // ) {
  //   return this.novelWriterService.update(id, dto.toEntity(user));
  // }
  @ApiOperation({
    summary: '소설 참여 작가 퇴장 API ',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.novelWriterService.delete(id);
  }

  @ApiOperation({
    summary: '참여 작가 상태 번경',
  })
  @Post('change-status')
  async changeWriterStatus(@Body() dto: UpdateNovelWriterStatusRequestDto) {
    await this.novelWriterService.changeWriterStatus(dto);
  }
}
