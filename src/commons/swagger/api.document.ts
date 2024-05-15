import { DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger API 문서 빌더
 */
export class BaseAPIDocumentBuilder {
  public builder = new DocumentBuilder();
  public initializeOptions() {
    return this.builder
      .setTitle('작가의 정원 Swagger')
      .setDescription('API 명세서')
      .setVersion('1.0')
      .setContact('_', '_', 'tb25271@gmail.com')
      .addBearerAuth(
        {
          description: 'Enter token',
          name: 'Authorization',
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'bearer',
        },
        'Authorization',
      ) // 토큰 내용 추가
      .build();
  }
}
