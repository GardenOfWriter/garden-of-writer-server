import {
  NovelRoomCategoryType,
  NovelRoomCategoryEnum,
} from '@app/novel-room/entities/enum/novel-room-category.enum';
import {
  NovelRoomType,
  NovelRoomTypeEnum,
} from '@app/novel-room/entities/enum/novel-room-type.enum';
import { UserEntity } from '@app/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { NovelRoomEntity } from '../../entities/novel-room.entity';
import { NovelAttendBoardEntity } from '@app/novel-attend-board/entities/novel-attend-board.entity';
import { TagEntity } from '@app/novel-tag/entities/tag.entity';
import { ChapterEntity } from '@app/chapter/entities/chapter.entity';
import { ChapterStatusEnum } from '@app/chapter/entities/enums/chapter-status.enum';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';
import { WriterStatusEnum } from '@app/novel-writer/entities/enums/writer-status.enum';
import { WriterCategoryEnum } from '@app/novel-writer/entities/enums/writer-category.enum';

export class CreateNovelRoomDto {
  @ApiProperty({
    example: '공방 1',
    description: '소설 공망 제목',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '공방 한줄소개 1',
    description: '소설 한줄소개',
  })
  @IsString()
  subTitle: string;

  @ApiProperty({
    example: `${NovelRoomCategoryEnum.ACTION_MARTIAL_ARTS}`,
    description: '일반소설 | 코믹',
  })
  @IsEnum(NovelRoomCategoryEnum, {
    message: 'category 는 1,2,3,4,5,6,7,8,9 에서 입력 가능합니다.',
  })
  category: NovelRoomCategoryType;

  @ApiProperty({
    example: ['태그입니다'],
    description: '배열로 태그를 전달',
  })
  @IsArray()
  novelTags: string[];

  @ApiProperty({
    enum: NovelRoomTypeEnum,
    example: NovelRoomTypeEnum.GROUP2,
    description: '작가 정원',
  })
  @IsNotEmpty()
  @IsEnum(NovelRoomTypeEnum)
  type: NovelRoomType;

  @ApiProperty({
    example: '등장 인물',
    description: '등장인물',
  })
  @IsNotEmpty()
  character: string;

  @ApiProperty({
    example: '줄거리',
    description: '줄거리',
  })
  @IsNotEmpty()
  summary: string;

  @ApiProperty({
    example: '북커버 이미지 주소',
    description: '공방 북커버 ',
  })
  @IsString()
  @IsOptional()
  bookCover: string;

  @ApiProperty({
    example: '공방 모집글 제목',
    description: '공방 모집글 제목',
  })
  @IsString()
  @IsOptional()
  attendTitle: string;

  @ApiProperty({
    example: '공방 모집글 카카오톡 링크',
    description: '공방 모집글 카카오톡 링크',
  })
  @IsString()
  @IsOptional()
  attendOpenKakaoLink: string;

  @ApiProperty({
    example: '공방 모집글 본문',
    description: '공방 모집글 본문',
  })
  @IsString()
  @IsOptional()
  attendContent: string;

  // request dto -> toEntity -> of method -> entity
  toRoomEntity(user: UserEntity): NovelRoomEntity {
    return NovelRoomEntity.of(
      this.type,
      this.title,
      this.subTitle,
      this.category,
      this.character,
      this.summary,
      this.bookCover,
      user,
    );
  }
  toAttendBoardEntity(roomId: number): NovelAttendBoardEntity {
    return NovelAttendBoardEntity.of(
      roomId,
      this.attendTitle,
      this.attendContent,
      this.attendOpenKakaoLink,
    );
  }

  toChapterEntity(roomId: number, user: UserEntity): ChapterEntity {
    const chapterStatus = ChapterStatusEnum.WRITING;
    return ChapterEntity.of(roomId, chapterStatus, user);
  }

  toWriterEntity(roomId: number, user: UserEntity) {
    const writerStatus = WriterStatusEnum.ATTENDING;
    const host = WriterCategoryEnum.HOST;
    // Room 생성할때 host는 자동으로 현재 작성 유저로 설정
    return NovelWriterEntity.of(roomId, host, writerStatus, user, true);
  }
}
