import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export abstract class BasePaginationRequest {
  @ApiProperty({
    example: 10,
    description: '한페이지 가져올 row 갯수',
  })
  @IsNumber()
  chunkSize: number;

  @ApiProperty({
    example: 1,
    description: '조회할 페이지 번호',
  })
  @IsNumber()
  pageNo: number;

  get skip(): number {
    return (this.pageNo - 1) * this.chunkSize;
  }

  get take(): number {
    return this.chunkSize;
  }

  getDESCtNownum() {
    return this.pageNo;
  }
}
