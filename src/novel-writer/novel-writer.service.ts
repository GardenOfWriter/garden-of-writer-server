import { Inject, Injectable, Logger } from '@nestjs/common';
import { In } from 'typeorm';

import {
  EmailService,
  EmailServiceToken,
} from '@app/commons/email/email.service';
import { EmailTemplate } from '@app/commons/email/enums/teamplate.enums';
import { UserEntity } from '../user/entities/user.entity';
import { ChangeWriterSeqRequestDto } from './dto/request/change-writer-seq.dto';
import { FindByNovelRoomIdResponseDto } from './dto/response/find-novel-room-id.dto';
import { WriterStatusEnum } from './entities/enums/writer-status.enum';
import { NovelWriterEntity } from './entities/novel-writer.entity';
import { AlreadyExistWriterExcetpion } from './exceptions/already-exist-writer.excetpion';
import { BadChangeWriterIdSeqExcetpion } from './exceptions/bad-change-writer-id-seq.exception';
import { NotAccessWriterManagementExcetpion } from './exceptions/not-access-management-writer.excetpion';
import {
  NovelWriterRepository,
  NovelWriterRepositoryToken,
} from './repository/novel-writer.repository';

@Injectable()
export class NovelWriterService {
  private logger = new Logger(NovelWriterService.name);

  constructor(
    @Inject(EmailServiceToken)
    private emailService: EmailService,
    @Inject(NovelWriterRepositoryToken)
    private novelWriterRepo: NovelWriterRepository,
  ) {}
  async create(entity: Partial<NovelWriterEntity>): Promise<void> {
    /**
     *  TODO: 참여 작가로 참여하는건 2개를 초과해서는 안됨
     */
    const writers = await this.novelWriterRepo.findByoptions({
      where: {
        novelRoom: { id: entity.novelRoom.id },
        user: { id: entity.user.id },
      },
    });
    this.logger.log(`Writer check ${JSON.stringify(writers)}`);
    if (writers.length > 0) {
      throw new AlreadyExistWriterExcetpion();
    }
    await this.novelWriterRepo.saveRow(entity);
    return;
  }
  async update(id: number, entity: Partial<NovelWriterEntity>): Promise<void> {
    await this.novelWriterRepo.updateRow(id, entity);
    return;
  }

  async delete(id: number): Promise<void> {
    const chapter = await this.novelWriterRepo.findByoptions({
      where: { id },
    });
    // TODO : 아래 validation 반드시 필요. 추후 구현 (CASL 로 구현)

    await this.novelWriterRepo.deleteRow(id);
    return;
  }

  async findByNoveRoomId(novelRoomId: number, user: UserEntity) {
    const writers = await this.novelWriterRepo.findByNovelRoomId(novelRoomId);
    this.logger.log(`Join Writer List ${JSON.stringify(writers)}`);
    return writers.map(
      (writer, index) => new FindByNovelRoomIdResponseDto(writer, index),
    );
  }
  async checkRoomStatusAttend(email: string): Promise<boolean> {
    const writers = await this.novelWriterRepo.findByoptions({
      where: {
        user: {
          email,
        },
      },
    });
    return writers.length === 0 ? false : true;
  }

  async changeWriterSeq(dto: ChangeWriterSeqRequestDto, user: UserEntity) {
    const writers = await this.novelWriterRepo.findByoptions({
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

    await this.novelWriterRepo.saveRows(updateSeq);
  }

  /**
   * 작가 리스트에서 자신이 해당 소설공방에 대한 정보를 가져오기
   */

  private writerPemissionCheck(writers: NovelWriterEntity[], user: UserEntity) {
    const currentWriter = this.filterCurrentWriter(writers, user);
    if (!currentWriter || !currentWriter.isHost()) {
      throw new NotAccessWriterManagementExcetpion();
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
