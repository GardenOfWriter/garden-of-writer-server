import { Inject, Injectable, Logger } from '@nestjs/common';
import { In } from 'typeorm';

import { EmailService, EmailServiceToken } from '@app/commons/email/email.service';
import { EmailTemplate } from '@app/commons/email/enums/teamplate.enums';
import { UserEntity } from '../user/entities/user.entity';
import { UpdateNovelWriterStatusRequestDto } from './dto/request/update-novel-writer-status.dto';
import { FindByNovelWriterDetails } from './dto/response/find-writers-details.dto';
import { WriterStatusEnum } from './entities/enums/writer-status.enum';
import { NovelWriterEntity } from './entities/novel-writer.entity';
import { NovelWriterRepository, NovelWriterRepositoryToken } from './repository/novel-writer.repository';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { FindNovelWriteManagementDto } from './dto/request/find-novel-writer.dto';
import { NovelRoomRepo, NovelRoomRepository } from '@app/novel-room/repository/novel-room.repository';
import { NotAccessWriterManagementExcetpion } from './exceptions/novel-writer.exception';

@Injectable()
export class WriterManagementService {
  private logger = new Logger(WriterManagementService.name);

  constructor(
    @Inject(EmailServiceToken)
    private emailService: EmailService,
    @Inject(NovelWriterRepositoryToken)
    private novelWriterRepo: NovelWriterRepository,
    @NovelRoomRepo()
    private readonly novelRoomrepo: NovelRoomRepository,
  ) {}

  async findByNovelRoomIdDetails(user: UserEntity, dto: FindNovelWriteManagementDto): Promise<PagingationResponse<FindByNovelWriterDetails>> {
    const [writers, totalCount] = await this.novelWriterRepo.findByNovelRoomIdDetails(dto.novelRoomId, dto);
    this.writerPemissionCheck(writers, user);
    const items = writers.map((writer) => new FindByNovelWriterDetails(writer));
    return new PagingationResponse(totalCount, dto.chunkSize, items);
  }
  async changeWriterStatus(id: number, dto: UpdateNovelWriterStatusRequestDto, user: UserEntity): Promise<void> {
    const requestWriter = await this.novelWriterRepo.findOneByOptions({
      where: {
        user: { id: user.id },
      },
    });
    this.logger.log(`Request Host ? ${JSON.stringify(requestWriter.isHost())}`);

    if (!requestWriter.isHost()) {
      throw new NotAccessWriterManagementExcetpion();
    }
    const writer = await this.novelWriterRepo.findOneByOptions({
      relations: ['user', 'novelRoom'],
      where: {
        id,
      },
    });

    this.logger.log(`Writer ${JSON.stringify(writer)}`);

    const roomWriterCnt = await this.novelWriterRepo.findBynovelRoomIdAttendingCount(writer.novelRoomId);
    writer.changeStatue(dto.status);
    writer.setSeq(roomWriterCnt + 1);
    await this.novelWriterRepo.saveRow(writer);
    // TODO : 이메일 발송
    // await this.changeSendEmail(writer);

    return;
  }

  /**
   * 작가 리스트에서 자신이 해당 소설공방에 대한 정보를 가져오기
   */

  private writerPemissionCheck(writers: NovelWriterEntity[], user: UserEntity) {
    const currentWriter = this.filterCurrentWriter(writers, user);
    this.logger.log(`Current Writer ${JSON.stringify(currentWriter)}`);
    if (!currentWriter || !currentWriter.isHost()) {
      throw new NotAccessWriterManagementExcetpion();
    }
  }

  /**
   * 현재 작가 정보 가져오기

   * @private
   * @param {NovelWriterEntity[]} writers
   * @param {UserEntity} user
   * @returns {NovelWriterEntity}
   */
  private filterCurrentWriter(writers: NovelWriterEntity[], user: UserEntity): NovelWriterEntity {
    const writer = writers.filter((writer) => writer.user.id === user.id);
    return writer[0];
  }

  /**
   * 작가 상태 변경시 이메일 발송
   *
   * @private
   * @async
   * @param {NovelWriterEntity} writer  작가 정보
   * @returns {Promise<void>}
   */
  private async changeSendEmail(writer: NovelWriterEntity): Promise<void> {
    if (writer.isStatusAttendingOrReject()) {
      const template = writer.status == WriterStatusEnum.ATTENDING ? EmailTemplate.WRITER_ATTENDING : EmailTemplate.WRITER_REJECT;
      await this.emailService.sendEmail(writer.user.email, template.title, ' ', template, {
        username: writer.user.nickname,
        room: writer.novelRoom.title,
      });
    }
  }
}
