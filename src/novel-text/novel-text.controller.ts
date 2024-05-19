import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { CreateNovelText, DeleteNovelText, FindByIdNovelText, FindNovelText, UpdateNovelText } from './decorator/novel-text.decorator';
import { CreateNovelTextRequestDto } from './dto/request/create-novel.dto';
import { UpdateTextNovelRequestDto } from './dto/request/update-novel.dto';
import { NovelTextService } from './novel-text.service';
import { TransactionInterceptor } from '@app/commons/interceptor/transaction.interceptor';
import { QueryRunner } from '@app/commons/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
@ApiTags('소설글쓰기')
@Controller('novel-text')
@ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
@UseGuards(JwtGuard)
export class NovelTextController {
  constructor(private novelTextService: NovelTextService) {}

  @FindNovelText()
  @Get('')
  async findChpater(@Query('chapterId') chapterId: number) {
    return await this.novelTextService.findByChapterIdNovelText(chapterId);
  }
  @FindByIdNovelText()
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.novelTextService.findById(id);
  }

  @UseInterceptors(TransactionInterceptor)
  @CreateNovelText()
  @Post('')
  async create(@CurrentUser() user: UserEntity, @Body() dto: CreateNovelTextRequestDto, @QueryRunner() qr?: QR) {
    return await this.novelTextService.create(dto.novelRoomId, dto.toEntity(user), user);
  }
  @UpdateNovelText()
  @Put(':id')
  update(@Param('id', ParseIntPipe) id, @CurrentUser() user: UserEntity, @Body() dto: UpdateTextNovelRequestDto) {
    return this.novelTextService.update(id, dto.toEntity(user));
  }

  @DeleteNovelText()
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: UserEntity) {
    return await this.novelTextService.delete(id, user);
  }
}
