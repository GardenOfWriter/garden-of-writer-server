import { ApiProperty } from '@nestjs/swagger';
import { NovelWriterEntity } from '../../entities/novel-writer.entity';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class ChangeWriterSeqRequestDto {
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
    example: [17, 18, 19, 20, 21],
    description: '작가 순서를 담은 WriterId의 array',
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
