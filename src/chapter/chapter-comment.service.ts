import { ChapterCommentRepo, ChapterCommentRepository } from './repository/chapter-comment.repository';
import { ChapterCommentEntity } from './entities/chapter-comment.entity';
import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { Injectable, Logger } from '@nestjs/common';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { MapOptions, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { FindByChapterIdCommentResDto } from '@app/novel-view/dto/response/find-by-chapter-id-res-comment.dto';
import { CreateChapterCommentReqDto } from '@app/novel-view/dto/request/create-comment-req.dto';
import { UserEntity } from '@app/user/entities/user.entity';
import { ChapterEntity } from './entities/chapter.entity';

/**
 * 회차 댓글 서비스 클래스
 *
 * @export
 * @class ChapterService  회차 서비스 클래스
 * @typedef {ChapterCommentService} ChapterCommentService
 */
@Injectable()
export class ChapterCommentService {
  private logger = new Logger(ChapterCommentService.name);

  constructor(
    @ChapterCommentRepo()
    private readonly chapterCommentRepository: ChapterCommentRepository,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async findByChapterId({
    chapterId,
    dto,
  }: {
    chapterId: number;
    dto: BasePaginationRequest;
  }): Promise<PagingationResponse<FindByChapterIdCommentResDto>> {
    const [comments, totalCount] = await this.chapterCommentRepository.findByChapterIdPaging(chapterId, dto);

    const result = this.classMapper.mapArray(comments, ChapterCommentEntity, FindByChapterIdCommentResDto);

    return new PagingationResponse(totalCount, dto.chunkSize, result);
  }

  async saveComment({ dto, chapterId, user }: { dto: CreateChapterCommentReqDto; chapterId: number; user: UserEntity }): Promise<void> {
    const commentOptions = this.createCommentMapper({ user, chapterId });
    const comment = this.classMapper.map(dto, CreateChapterCommentReqDto, ChapterCommentEntity, commentOptions);
    await this.chapterCommentRepository.saveRow(comment);
  }

  async deleteComment(commentId: number): Promise<void> {
    await this.chapterCommentRepository.deleteComment(commentId);
  }

  private createCommentMapper({ user, chapterId }: { user: UserEntity; chapterId: number }) {
    const mapOptions: MapOptions<CreateChapterCommentReqDto, ChapterCommentEntity> = {
      beforeMap: (source, destination) => {
        // destination에 createdBy 수동 설정
        destination.chapter = { id: chapterId } as ChapterEntity;
        destination.createdBy = user;
        destination.updatedBy = user;
      },
    };
    return mapOptions;
  }
}
