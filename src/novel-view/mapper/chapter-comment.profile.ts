import { ChapterCommentEntity } from '@app/chapter/entities/chapter-comment.entity';
import { createMap, forMember, ignore, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { FindByChapterIdCommentResDto } from '../dto/response/find-by-chapter-id-res-comment.dto';
import { CreateChapterCommentReqDto } from '../dto/request/create-comment-req.dto';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { UserNickName } from '../../user/entities/user-nickname';

@Injectable()
export class ChpaterCommentProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
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
