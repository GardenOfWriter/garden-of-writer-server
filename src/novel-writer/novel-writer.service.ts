import { Inject, Injectable, Logger } from '@nestjs/common';

import { userEntity } from '../user/entities/user.entity';
import { UpdateNovelWriterStatusRequestDto } from './dto/request/update-novel-writer-status.dto';
import { FindByNovelRoomIdResponseDto } from './dto/response/find-novel-room-id.dto';
import { FindByNovelWriterDetails } from './dto/response/find-writers-details.dto';
import { NovelWriterEntity } from './entities/novel-writer.entity';
import { AlreadyExistWriterExcetpion } from './exceptions/already-exist-writer.excetpion';
import { NotAccessParticiateWriterExcetpion } from './exceptions/not-access-particiate-writer.excetpion';
import { NovelWriterRepository } from './repository/novel-writer.repository';

@Injectable()
export class NovelWriterService {
  private logger = new Logger(NovelWriterService.name);

  constructor(
    @Inject(NovelWriterRepository)
    private novelWriterRepository: NovelWriterRepository,
  ) {}
  async create(entity: Partial<NovelWriterEntity>): Promise<void> {
    /**
     *  TODO 참여 작가로 참여하는건 2개를 초과해서는 안됨
     */
    const writer = await this.novelWriterRepository.findByoptions({
      where: {
        novelRoom: { id: entity.novelRoom.id },
        user: { id: entity.user.id },
      },
    });
    this.logger.log('writer check', JSON.stringify(writer));
    if (writer.length > 0) {
      throw new AlreadyExistWriterExcetpion();
    }
    await this.novelWriterRepository.saveRow(entity);
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
  async findByNovelRoomIdDetails(
    user: userEntity,
    novelRoomId: number,
  ): Promise<FindByNovelWriterDetails[]> {
    const writers = await this.novelWriterRepository.findByoptions({
      relations: ['user'],
      where: {
        novelRoom: { id: novelRoomId },
      },
    });
    /**
     * 작가 리스트에서 자신이 해당 소설공방에 대한 정보를 가져오기
     */
    const currentWriter: NovelWriterEntity = writers.filter(
      (writer) => writer.user.id === user.id,
    )[0];
    /**
     * 자신이 대표작가인지 확인 아닐경우 접근 불가
     */
    if (currentWriter.isRepresentativeWriter()) {
      throw new NotAccessParticiateWriterExcetpion();
    }
    return writers.map((writer) => new FindByNovelWriterDetails(writer));
  }
  async changeWriterStatus(
    dto: UpdateNovelWriterStatusRequestDto,
  ): Promise<void> {
    const writer =
      await this.novelWriterRepository.findOneByUserIdAndNovelRoomId(
        dto.userId,
        dto.novelRoomId,
      );
    writer.changeStatue(dto.status);
    await this.novelWriterRepository.saveRow(writer);
    return;
  }
}
