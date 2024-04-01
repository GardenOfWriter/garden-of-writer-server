import { Inject, Injectable, Logger } from '@nestjs/common';
import { In } from 'typeorm';

import {
  EmailService,
  EmailServiceToken,
} from '@app/commons/email/email.service';
import { EmailTemplate } from '@app/commons/email/enums/teamplate.enums';
import { UserEntity } from '../user/entities/user.entity';
import { ChangeWriterSeqRequestDto } from './dto/request/change-writer-seq.dto';
import { UpdateNovelWriterStatusRequestDto } from './dto/request/update-novel-writer-status.dto';
import { FindByNovelRoomIdResponseDto } from './dto/response/find-novel-room-id.dto';
import { FindByNovelWriterDetails } from './dto/response/find-writers-details.dto';
import { WriterStatusEnum } from './entities/enums/writer-status.enum';
import { NovelWriterEntity } from './entities/novel-writer.entity';
import { AlreadyExistWriterExcetpion } from './exceptions/already-exist-writer.excetpion';
import { BadChangeWriterIdSeqExcetpion } from './exceptions/bad-change-writer-id-seq.exception';
import { NotAccessParticiateWriterExcetpion } from './exceptions/not-access-particiate-writer.excetpion';
import {
  NovelWriterRepository,
  NovelWriterRepositoryToken,
} from './repository/novel-writer.repository';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { FindNovelWriteManagementDto } from './dto/request/find-novel-writer.dto';

@Injectable()
export class NovelWriterService {
  private logger = new Logger(NovelWriterService.name);

  constructor(
    @Inject(EmailServiceToken)
    private emailService: EmailService,
    @Inject(NovelWriterRepositoryToken)
    private novelWriterRepository: NovelWriterRepository,
  ) {}
  async create(entity: Partial<NovelWriterEntity>): Promise<void> {
    /**
     *  TODO 참여 작가로 참여하는건 2개를 초과해서는 안됨
     */
    const writers = await this.novelWriterRepository.findByoptions({
      where: {
        novelRoom: { id: entity.novelRoom.id },
        user: { id: entity.user.id },
      },
    });
    this.logger.log('writer check', JSON.stringify(writers));
    if (writers.length > 0) {
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

  async findByNoveRoomId(novelRoomId: number, user: UserEntity) {
    const writers =
      await this.novelWriterRepository.findByNovelRoomId(novelRoomId);
    this.writerPemissionCheck(writers, user);
    return writers.map(
      (writer, index) => new FindByNovelRoomIdResponseDto(writer, index),
    );
  }
  async checkRoomStatusAttend(email: string): Promise<boolean> {
    const writers = await this.novelWriterRepository.findByoptions({
      where: {
        user: {
          email,
        },
      },
    });
    return writers.length === 0 ? false : true;
  }
  async findByNovelRoomIdDetails(
    user: UserEntity,
    dto: FindNovelWriteManagementDto,
  ): Promise<PagingationResponse<FindByNovelWriterDetails>> {
    const [writers, totalCount] =
      await this.novelWriterRepository.findByNovelRoomIdDetails(
        dto.novelRoomId,
        dto,
      );
    this.writerPemissionCheck(writers, user);
    const items = writers.map((writer) => new FindByNovelWriterDetails(writer));
    return new PagingationResponse(totalCount, dto.chunkSize, items);
  }
  async changeWriterStatus(
    id: number,
    dto: UpdateNovelWriterStatusRequestDto,
  ): Promise<void> {
    const writer = await this.novelWriterRepository.findOneByOptions({
      relations: ['user', 'novelRoom'],
      where: {
        id,
      },
    });
    const roomWriterCnt =
      await this.novelWriterRepository.findBynovelRoomIdAttendingCount(
        writer.novelRoomId,
      );
    writer.changeStatue(dto.status);
    writer.setSeq(roomWriterCnt + 1);
    await this.novelWriterRepository.saveRow(writer);
    try {
      await this.changeSendEmail(writer);
    } catch (error) {
      console.error(error);
    }
    return;
  }
  async changeWriterSeq(dto: ChangeWriterSeqRequestDto, user: UserEntity) {
    const writers = await this.novelWriterRepository.findByoptions({
      where: {
        id: In(dto.writerIdSeq),
        novelRoom: { id: dto.novelRoomId },
        status: WriterStatusEnum.ATTENDING,
      },
    });
    if (!dto.checkRoomAttendWriter(writers)) {
      throw new BadChangeWriterIdSeqExcetpion();
    }

    this.writerPemissionCheck(writers, user);
    const updateSeq = writers.map((writer) => {
      writer.setSeq(dto.getIndexSeq(writer.id));
      return writer;
    });

    await this.novelWriterRepository.saveRows(updateSeq);
  }

  /**
   * 작가 리스트에서 자신이 해당 소설공방에 대한 정보를 가져오기
   */

  private writerPemissionCheck(writers: NovelWriterEntity[], user: UserEntity) {
    const currentWriter = this.filterCurrentWriter(writers, user);
    if (!currentWriter || !currentWriter.isHost()) {
      throw new NotAccessParticiateWriterExcetpion();
    }
  }
  private filterCurrentWriter(
    writers: NovelWriterEntity[],
    user: UserEntity,
  ): NovelWriterEntity {
    const writer = writers.filter((writer) => writer.user.id === user.id);
    return writer[0];
  }
  private async changeSendEmail(writer: NovelWriterEntity) {
    if (
      writer.status === WriterStatusEnum.ATTENDING ||
      writer.status === WriterStatusEnum.REJECT
    ) {
      const template =
        writer.status == WriterStatusEnum.ATTENDING
          ? EmailTemplate.WRITER_ATTENDING
          : EmailTemplate.WRITER_REJECT;
      await this.emailService.sendEmail(
        writer.user.email,
        template.title,
        ' ',
        template,
        { username: writer.user.nickname, room: writer.novelRoom.title },
      );
    }
  }
}
