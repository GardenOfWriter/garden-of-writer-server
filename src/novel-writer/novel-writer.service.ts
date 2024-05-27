import { Inject, Injectable, Logger } from '@nestjs/common';
import { In } from 'typeorm';

import { EmailService, EmailServiceToken } from '@app/commons/email/email.service';
import { UserEntity } from '../user/entities/user.entity';
import { ChangeWriterSeqRequestDto } from './dto/request/change-writer-seq.dto';
import { WriterStatusEnum } from './entities/enums/writer-status.enum';
import { NovelWriterEntity } from './entities/novel-writer.entity';
import { NovelWriterRepo, NovelWriterRepository } from './repository/novel-writer.repository';
import {
  AlreadyExistWriterExcetpion,
  BadChangeWriterIdSeqExcetpion,
  NotAccessWriterManagementExcetpion,
  NotExitSelfInNovelRoomExcetpion,
} from './exceptions/novel-writer.exception';
import { ChatsGateway } from '@app/chats/chats.gateway';
import { SOCKET_EVENT } from '@app/chats/enums/socket.event';
import { isEmpty } from '../commons/util/data.helper';
import { FindNovelRoomWritersDto } from './dto/response/find-novel-room-writers.dto';
import { FindNovelRoomResponseDto } from './dto/response/find-novel-room-response.dto';

/**
 * 소설 공방 작가 서비스
 *
 * @export
 * @class NovelWriterService
 * @typedef {NovelWriterService}
 */
@Injectable()
export class NovelWriterService {
  private logger = new Logger(NovelWriterService.name);

  constructor(
    @Inject(EmailServiceToken)
    private readonly emailService: EmailService,
    @NovelWriterRepo()
    private readonly novelWriterRepo: NovelWriterRepository,
    private readonly chatsGateway: ChatsGateway,
  ) {}

  /**
   * 소설 공방 작가 등록
   *
   * @async
   * @param {Partial<NovelWriterEntity>} entity 작가 정보
   * @returns {Promise<void>}
   */
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
    if (!isEmpty(writers)) {
      throw new AlreadyExistWriterExcetpion();
    }
    await this.novelWriterRepo.saveRow(entity);
    return;
  }

  /**
   * 소설 공방 작가 정보 수정
   *
   * @async
   * @param {number} id
   * @param {Partial<NovelWriterEntity>} entity
   * @returns {Promise<void>}
   */
  async update(id: number, entity: Partial<NovelWriterEntity>): Promise<void> {
    await this.novelWriterRepo.updateRow(id, entity);
    return;
  }

  /**
   * 소설 공방 작가 정보 삭제
   *
   * @async
   * @param {number} id
   * @returns {Promise<void>}
   */
  async delete(id: number): Promise<void> {
    const chapter = await this.novelWriterRepo.findByoptions({
      where: { id },
    });
    // TODO : 아래 validation 반드시 필요. 추후 구현 (CASL 로 구현)

    await this.novelWriterRepo.deleteRow(id);
    return;
  }

  /**
   * 소설 공방 작가 정보 조회 (소설 공방 ID)
   *
   * @async
   * @param {number} novelRoomId 소설 공방 ID
   * @param {UserEntity} user 유저 정보 엔티티
   * @returns {unknown}
   */
  async findByNoveRoomId(novelRoomId: number, user: UserEntity) {
    const writers = await this.novelWriterRepo.findByNovelRoomId(novelRoomId);
    this.logger.log(`Join Room : ${novelRoomId} Writer List ${JSON.stringify(writers)}`);
    const result = writers.map((writer, index) => new FindNovelRoomWritersDto(writer, index));
    const currentWriter = writers.filter((writer) => writer.isCurrentlyWriter())[0];
    const nextWriterSeq = currentWriter.getNextSeq(writers.length);
    const nextWriter = writers.filter((writer) => writer.writingSeq === nextWriterSeq)[0];
    return new FindNovelRoomResponseDto(result, nextWriter.user.nickname);
  }

  /**
   * 소설 공방 작가 상태 변경
   *
   * @async
   * @param {string} email 유저 이메일
   * @returns {Promise<boolean>} 작가 상태 변경 여부
   */
  async checkRoomStatusAttend(email: string): Promise<boolean> {
    const writers = await this.novelWriterRepo.findByUserEmail(email);
    return writers.length === 0 ? false : true;
  }

  /**
   * 소설 공방 작가 순서 변경
   *
   * @async
   * @param {ChangeWriterSeqRequestDto} dto 작가 순서 변경 DTO
   * @param {UserEntity} user
   * @returns {Promise<void>}
   */
  async changeWriterSeq(dto: ChangeWriterSeqRequestDto, user: UserEntity): Promise<void> {
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
    this.chatsGateway.sendNovelRoomInMessage(dto.novelRoomId, SOCKET_EVENT.CHANGE_WRITER_SEQUENCE, JSON.stringify({ novelRoomId: dto.novelRoomId }));
  }

  /**
   * 소설 공방 작가 퇴장
   *
   * @async
   * @param {number} writerId 공방 참여 작가
   * @returns {Promise<void>}
   */
  async exitWriter(writerId: number, user: UserEntity): Promise<void> {
    const writer = await this.novelWriterRepo.findById(writerId);
    if (writer.isSelf(user)) {
      throw new NotExitSelfInNovelRoomExcetpion();
    }
    writer.changeStatue(WriterStatusEnum.EXIT);
    await this.novelWriterRepo.saveRow(writer);
    await this.chatsGateway.sendNovelRoomInMessage(writer.novelRoom.id, SOCKET_EVENT.EXIT_WRITER, JSON.stringify({ writerId }));
  }

  /**
   * 소설 공방 작가 관리 접근 권한 체크
   *
   * @private
   * @param {NovelWriterEntity[]} writers 공방 작가 리스트
   * @param {UserEntity} user 유저 정보 엔티티
   */
  private writerPemissionCheck(writers: NovelWriterEntity[], user: UserEntity) {
    const currentWriter = this.filterCurrentWriter(writers, user);
    if (!currentWriter || !currentWriter.isHost()) {
      throw new NotAccessWriterManagementExcetpion();
    }
  }

  /**
   * 현재 작가 정보 필터링
   *
   * @private
   * @param {NovelWriterEntity[]} writers 공방 작가 리스트
   * @param {UserEntity} user  유저 정보 엔티티
   * @returns {NovelWriterEntity} 현재 작가 정보
   */
  private filterCurrentWriter(writers: NovelWriterEntity[], user: UserEntity): NovelWriterEntity {
    const writer = writers.filter((writer) => writer.user.id === user.id);
    return writer[0];
  }
}
