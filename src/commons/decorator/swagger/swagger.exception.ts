import { ApiProperty } from '@nestjs/swagger';

export class SwaggerExceptionDto {
  @ApiProperty({ required: true, description: '에러메세지', example: '0001' })
  message: string;
  @ApiProperty({ required: true, description: '에러코드', example: '0001' })
  errorCode: string;

  @ApiProperty({
    required: true,
    description: 'API 에러 경로 ',
    example: '/novel',
  })
  path: string;
  @ApiProperty({
    required: true,
    description: '웹 상태코드',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    required: true,
    description: '응답 데이터',
    example: '200',
  })
  data: string;

  @ApiProperty({
    required: true,
    description: '호출 시간',
    example: '200',
  })
  timestamp: string;
}
