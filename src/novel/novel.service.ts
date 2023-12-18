import { Injectable, Logger } from '@nestjs/common';
import { CreateNovelRequestDto } from './dto/request/create-novel.dto';

@Injectable()
export class NovelService {
  private logger = new Logger(NovelService.name);
  addRow(dto: CreateNovelRequestDto) {
    const entity = dto.toEntity();
    this.logger.log('entity', entity, 'type', typeof entity);
    return entity;
  }
}
