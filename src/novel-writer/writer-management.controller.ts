import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
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
import { FindNovelWriteManagementDto } from './dto/request/find-novel-writer.dto';
import { FindWriterMangement } from './decorator/find-writer.decorator';
import { WriterManagementService } from './writer-management.service';

@ApiTags('참여 작가 관리 (대표작가)')
@Controller('writer/management')
@ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
@UseGuards(JwtGuard)
export class WriterManagementController {
  constructor(private writerMgrService: WriterManagementService) {}

  @ApiOperation({
    summary: '참여 작가 상태 번경',
  })
  @Put('/status/:id')
  async changeWriterStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNovelWriterStatusRequestDto,
    @CurrentUser() user: UserEntity,
  ) {
    await this.writerMgrService.changeWriterStatus(id, dto, user);
  }

  @FindWriterMangement()
  @Get('')
  async findWriterManagement(
    @CurrentUser() user: UserEntity,
    @Query() dto: FindNovelWriteManagementDto,
  ) {
    return await this.writerMgrService.findByNovelRoomIdDetails(user, dto);
  }
}
