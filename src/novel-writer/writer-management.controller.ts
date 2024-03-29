import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { UpdateNovelWriterStatusRequestDto } from './dto/request/update-novel-writer-status.dto';
import { NovelWriterService } from './novel-writer.service';
import { FindNovelWriteManagementrDto } from './dto/request/find-novel-writer.dto';

@ApiTags('참여 작가 관리 (대표작가)')
@Controller('writer/management')
@ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
@UseGuards(JwtGuard)
export class WriterManagementController {
  constructor(private novelWriterService: NovelWriterService) {}

  @ApiOperation({
    summary: '참여 작가 상태 번경',
  })
  @Put('/status/:id')
  async changeWriterStatus(
    @Param('id') id: number,
    @Body() dto: UpdateNovelWriterStatusRequestDto,
  ) {
    await this.novelWriterService.changeWriterStatus(id, dto);
  }

  @ApiOperation({
    summary: '소설 공방 작가 관리 메뉴 조회',
  })
  @Get('')
  async findWriterManagement(
    @CurrentUser() user: UserEntity,
    @Query() dto: FindNovelWriteManagementrDto,
  ) {
    return await this.novelWriterService.findByNovelRoomIdDetails(user, dto);
  }
}
