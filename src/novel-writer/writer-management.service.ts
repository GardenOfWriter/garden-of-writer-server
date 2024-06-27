import { Inject, Injectable, Logger } from '@nestjs/common';

import { EmailService, EmailServiceToken } from '@app/commons/email/email.service';
import { EmailTemplate } from '@app/commons/email/enums/teamplate.enums';
import { UserEntity } from '../user/entities/user.entity';
import { UpdateNovelWriterStatusRequestDto } from './dto/request/update-novel-writer-status.dto';
import { FindByNovelWriterDetails } from './dto/response/find-writers-details.dto';
import { WriterStatusEnum } from './entities/enums/writer-status.enum';
import { NovelWriterEntity } from './entities/novel-writer.entity';
import { NovelWriterRepo, NovelWriterRepository, NovelWriterRepositoryToken } from './repository/novel-writer.repository';
import { PagingationResponse } from '@app/commons/pagination/pagination.response';
import { FindNovelWriteManagementDto } from './dto/request/find-novel-writer.dto';
import { NovelRoomRepo, NovelRoomRepository } from '@app/novel-room/repository/novel-room.repository';
import { NotAccessWriterManagementExcetpion, NotFoundWriterIdExcetpion } from './exceptions/novel-writer.exception';
import { isEmpty } from '@app/commons/util/data.helper';
/**
 * 작가 관리 서비스
 *
 * @export
 * @class WriterManagementService
 * @typedef {WriterManagementService}
 */
@Injectable()
export class WriterManagementService {
  private logger = new Logger(WriterManagementService.name);

  constructor(
    @Inject(EmailServiceToken)
    private emailService: EmailService,
    @NovelWriterRepo()
    private novelWriterRepo: NovelWriterRepository,
    @NovelRoomRepo()
    private readonly novelRoomrepo: NovelRoomRepository,
  ) {}

  /**
   * 작가 정보 상세 조회 (페이징)
   *
   * @async
   * @param {UserEntity} user 유저 정보
   * @param {FindNovelWriteManagementDto} dto 작가 정보 조회 dto
   * @returns {Promise<PagingationResponse<FindByNovelWriterDetails>>} 작가 정보 상세 조회 (페이징)
   */
  async findByNovelRoomIdDetails(user: UserEntity, dto: FindNovelWriteManagementDto): Promise<PagingationResponse<FindByNovelWriterDetails>> {
    const [writers, totalCount] = await this.novelWriterRepo.findByNovelRoomIdDetails(dto.novelRoomId, dto);
    this.writerPemissionCheck(writers, user);
    const items = writers.map((writer) => new FindByNovelWriterDetails(writer));
    return new PagingationResponse(totalCount, dto.chunkSize, items);
  }

  /**
   * 작가 순서 변경
   *
   * @async
   * @param {number} id 작가 정보 id
   * @param {UpdateNovelWriterStatusRequestDto} dto 작가 정보 변경 dto
   * @param {UserEntity} user 유저 정보
   * @returns {Promise<void>}
   */
  async changeWriterStatus(id: number, dto: UpdateNovelWriterStatusRequestDto, user: UserEntity): Promise<void> {
    const reqtWriter = await this.novelWriterRepo.findOneByIdWithNovelRoomAndUser(user.id);

    if (!reqtWriter.isHost()) {
      throw new NotAccessWriterManagementExcetpion();
    }

    const writer = await this.novelWriterRepo.findById(id);
    if (isEmpty(writer)) {
      throw new NotFoundWriterIdExcetpion();
    }

    const roomWriterCnt = await this.novelWriterRepo.findBynovelRoomIdAttendingCount(reqtWriter.novelRoomId);
    writer.changeStatue(dto.status);
    writer.setSeq(roomWriterCnt + 1);

    await this.novelWriterRepo.saveRow(writer);
    // TODO : 이메일 발송
    // await this.changeSendEmail(writer);
    return;
  }

  /**
   * 작가 관리 접근 권한 체크 (호스트만 가능)
   *
   * @private
   * @param {NovelWriterEntity[]} writers
   * @param {UserEntity} user
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
