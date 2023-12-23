import { userEntity } from '@app/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { novelRoomType } from 'src/novel-room/entities/enum/novel-room-type.enum';
import { NovelRoomEntity } from '../entities/novel-room.entity';

export class CreateNovelRoomDto {
  @ApiProperty({
    example: '공방 1',
    description: '소설 공망 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '공방 한줄소개 1',
    description: '소설 한줄소개',
  })
  @IsNotEmpty()
  @IsString()
  subTitle: string;

  @ApiProperty({
    example: '공방 카테고리',
    description: '일반소설 | 코믹',
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    enum: novelRoomType,
    example: 'group2',
    description: '작가 정원',
  })
  @IsNotEmpty()
  @IsEnum(novelRoomType)
  type: novelRoomType;

  @ApiProperty({
    example: '등장 인물',
    description: '등장인물',
  })
  @IsNotEmpty()
  character: string;

  @ApiProperty({
    enum: novelRoomType,
    example: '줄거리',
    description: '줄거리',
  })
  @IsNotEmpty()
  summary: string;

  // @ApiProperty({
  //   example: 1,
  //   description: '유저 ID',
  // })
  // @IsNotEmpty()
  private userId: number;

  setUserId(user: userEntity) {
    this.userId = user.id;
  }

  toEntity(): Partial<NovelRoomEntity> {
    return NovelRoomEntity.of(
      this.type,
      this.title,
      this.subTitle,
      this.category,
      this.character,
      this.summary,
    );
  }
}
