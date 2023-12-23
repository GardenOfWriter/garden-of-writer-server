import { Inject, Injectable, Logger } from '@nestjs/common';

import { NovelWriterRepository } from './repository/novel-writer.repository';
import { NovelWriterEntity } from './entities/novel-writer.entity';
import { FindByNovelRoomIdResponseDto } from './dto/response/findbynovel-room-id.dto';

@Injectable()
export class NovelWriterService {
  private logger = new Logger(NovelWriterService.name);

  constructor(
    @Inject(NovelWriterRepository)
    private novelWriterRepository: NovelWriterRepository,
  ) {}
  async create(entity: Partial<NovelWriterEntity>): Promise<void> {
    await this.novelWriterRepository.findByoptions({
      where: {
        novelRoom: { id: entity.novelRoom.id },
        user: { id: entity.user.id },
      },
    });
    await this.novelWriterRepository.addRow(entity);
    return;
  }
  async update(id: number, entity: Partial<NovelWriterEntity>): Promise<void> {
    await this.novelWriterRepository.updateRow(id, entity);
    return;
  }

  async delete(id: number): Promise<void> {
    const chapter = await this.novelWriterRepository.findByoptions({
      where: { id },
    });
    // TODO : 아래 validation 반드시 필요. 추후 구현 (CASL 로 구현)

    await this.novelWriterRepository.deleteRow(id);
    return;
  }

  async findByNoveRoomId(novelRoomId: number) {
    const writers =
      await this.novelWriterRepository.findByNovelRoomId(novelRoomId);
    return writers.map((writer) => new FindByNovelRoomIdResponseDto(writer));
  }
}
