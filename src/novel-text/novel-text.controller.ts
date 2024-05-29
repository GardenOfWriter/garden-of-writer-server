import { CurrentUser } from '@app/commons/decorator/current-user.decorator';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import {
  CompleteNovelText,
  CreateNovelText,
  DeleteNovelText,
  FindByIdNovelText,
  FindNovelText,
  UpdateNovelText,
} from './decorator/novel-text.decorator';
import { CreateNovelTextRequestDto } from './dto/request/create-novel.dto';
import { UpdateTextNovelRequestDto } from './dto/request/update-novel.dto';
import { NovelTextService } from './novel-text.service';
import { TransactionInterceptor } from '@app/commons/interceptor/transaction.interceptor';
import { QueryRunner } from '@app/commons/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { FindByChapterIdNovelTextDto } from './dto/request/findby-chapterid.dto';
@ApiTags('소설글쓰기[피그마 5번 채팅 관련]')
@Controller('novel-text')
@ApiBearerAuth('Authorization')
@SerializeOptions({
  excludePrefixes: ['_'],
})
@UseGuards(JwtGuard)
export class NovelTextController {
  constructor(private novelTextService: NovelTextService) {}

  /**
   *  소설 글쓰기 조회
   */
  @FindNovelText()
  @Get('')
  async findChpater(@Query() dto: FindByChapterIdNovelTextDto) {
    return await this.novelTextService.findByChapterIdNovelText(dto);
  }

  /**
   * 소설 글쓰기 상세 조회
   */
  @FindByIdNovelText()
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.novelTextService.findById(id);
  }

  /**
   * 소설 글쓰기 생성
   */
  @UseInterceptors(TransactionInterceptor)
  @CreateNovelText()
  @Post('')
  async create(@CurrentUser() user: UserEntity, @Body() dto: CreateNovelTextRequestDto, @QueryRunner() qr?: QR) {
    return await this.novelTextService.create(dto.toEntity(user));
  }

  /**
   * 소설 글쓰기 수정
   */
  @UpdateNovelText()
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: UserEntity, @Body() dto: UpdateTextNovelRequestDto) {
    return this.novelTextService.update(id, dto);
  }

  /**
   * 소설 글쓰기 완료
   */
  @UseInterceptors(TransactionInterceptor)
  @CompleteNovelText()
  @Put('/complete/:id')
  complete(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: UserEntity, @QueryRunner() qr: QR) {
    return this.novelTextService.complatedText(id, user);
  }

  /**
   * 소설 글쓰기 삭제
   */
  @DeleteNovelText()
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: UserEntity) {
    return await this.novelTextService.delete(id, user);
  }
}
