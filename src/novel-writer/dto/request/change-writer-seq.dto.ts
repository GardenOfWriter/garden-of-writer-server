import { ApiProperty, PickType } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber } from 'class-validator';
import { NovelWriterEntity } from '../../entities/novel-writer.entity';
import { NovelWirterDto } from '../novel-writer.dto';

export class ChangeWriterSeqRequestDto extends PickType(NovelWirterDto, ['novelRoomId']) {
  @ApiProperty({
    example: [17, 18, 19, 20, 21],
    description: '작가 순서를 담은 WriterId의 array',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsNumber({}, { each: true })
  writerIdSeq: number[];

  @ApiProperty({
    example: 1,
    description: '소설 공방 row Id',
  })
  @IsNumber()
  novelRoomId: number;

  getIndexSeq(writerId: number): number {
    console.log('writerId=', writerId);
    const seq = this.writerIdSeq.indexOf(writerId);
    console.log(seq);
    return seq + 1;
  }
  checkRoomAttendWriter(writers: NovelWriterEntity[]) {
    if (this.writerIdSeq.length !== writers.length) {
      return false;
    }
    return true;
  }
}
