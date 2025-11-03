import { ChapterCommentEntity } from '@app/chapter/entities/chapter-comment.entity';
import { createMap, forMember, ignore, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { FindByChapterIdCommentResDto } from '../dto/response/find-by-chapter-id-res-comment.dto';
import { CreateChapterCommentReqDto } from '../dto/request/create-comment-req.dto';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { UserNickName } from '../../user/entities/user-nickname';
import { UserEntity } from '@app/user/entities/user.entity';
import { ChapterLikeEntity } from '@app/chapter/entities/chapter-like.entity';
import { FindChapterLikeResponseDto } from '@app/chapter/dto/response/find-like-by-chapter-id.dto';
import { FindAllNovelViewResDto } from '../dto/response/find-all-novel-res.dto';
import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { FindChapterRoomIdResDto } from '@app/chapter/dto/response/findbychapter-id.dto';

@Injectable()
export class ChpaterProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, ChapterEntity, FindChapterRoomIdResDto);
      createMap(
        mapper,
        Object,
        ChapterLikeEntity,
        forMember(
          (dest) => dest.chapter,
          mapFrom((source) => source['chapterId']),
        ),
        forMember(
          (dest) => dest.user,
          mapFrom((source) => source['user']),
        ),
      );
      createMap(
        mapper,
        ChapterLikeEntity,
        FindChapterLikeResponseDto,
        forMember(
          (dest) => dest.likeCount,
          mapFrom((source) => 0),
        ),
      );
      createMap(
        mapper,
        ChapterCommentEntity,
        FindByChapterIdCommentResDto,
        forMember(
          (dest) => dest.createdBy,
          mapFrom((source) => {
            if (source.createdBy) {
              const result = {
                id: source.createdBy.id,
                nickname: source.createdBy.nickname,
              };
              return plainToInstance(UserNickName, result);
            }
            return null;
          }),
        ),
      );
      createMap(
        mapper,
        CreateChapterCommentReqDto,
        ChapterCommentEntity,
        forMember((dest) => dest.id, ignore()),
      );
    };
  }
}
