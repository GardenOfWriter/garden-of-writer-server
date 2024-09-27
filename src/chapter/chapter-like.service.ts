import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { FindChapterRoomIdResDto } from './dto/response/findbychapter-id.dto';
import { ChapterEntity } from './entities/chapter.entity';
import { FindByNovelRoomIdDto } from './dto/request/findby-novel-room-id.dto';
import { ChapterRepo, ChapterRepository } from './repository/chapter.repository';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { ChangeTitleDto } from './dto/request/change-title.dto';
import { UserEntity } from '@app/user/entities/user.entity';
import { isEmpty } from '../commons/util/data.helper';
import { NotFoundChapterException, NotWritingChapterException } from './exception/chpater.exception';
import { ChapterStatusEnum } from './entities/enums/chapter-status.enum';
import { CreateChapterRequestDto } from './dto/request/create-chapter.dto';
import { NovelRoomRepo, NovelRoomRepository } from '@app/novel-room/repository/novel-room.repository';
import { NovelRoomStatusEnum } from '@app/novel-room/entities/enum/novel-room-status.enum';
import { ChapterLikeRepo, ChapterLikeRepository } from './repository/chapter-like.repository';
import { ChapterLikeEntity } from './entities/chapter-like.entity';

/**
 * 회차 서비스 클래스
 *
 * @export
 * @class ChapterService  회차 서비스 클래스
 * @typedef {ChapterLikeService} ChapterLikeService
 */
@Injectable()
export class ChapterLikeService {
  private logger = new Logger(ChapterLikeService.name);

  constructor(
    @ChapterLikeRepo()
    private readonly chapterLikeRepository: ChapterLikeRepository,
    @ChapterRepo()
    private readonly chapterRepository: ChapterRepository,
  ) {}

  async findByChapterId(chapterId: number): Promise<ChapterLikeEntity[]> {
    const likes = await this.chapterLikeRepository.findByChapterId(chapterId);
    return likes;
  }

  async saveLike(like: ChapterLikeEntity): Promise<void> {
    await this.chapterLikeRepository.saveRow(like);
  }

  async deleteLike(likeId: number): Promise<void> {
    await this.chapterLikeRepository.deleteLike(likeId);
  }
}
