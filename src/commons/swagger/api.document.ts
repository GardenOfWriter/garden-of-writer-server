import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocumentBuilder {
  public builder = new DocumentBuilder();
  public initializeOptions() {
    return this.builder
      .setTitle('작가의 정원 Swagger')
      .setDescription('API 명세서')
      .setVersion('1.0')
      .setContact('_', '_', 'tb25271@gmail.com')
      .build();
  }
}
