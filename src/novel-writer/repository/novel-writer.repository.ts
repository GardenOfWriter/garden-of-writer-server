import { FindOneOptions } from 'typeorm';
import { NovelWriterEntity } from '../entities/novel-writer.entity';
import { Inject, Provider } from '@nestjs/common';
import { NovelWriterRepositoryImpl } from './novel-writer.repository.impl';
import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';

export const NovelWriterRepositoryToken = 'NovelWriterRepository';

export const NovelWriterRepo = () => Inject(NovelWriterRepositoryToken);

export const NovelWriterRepositoryProvider: Provider = {
  provide: NovelWriterRepositoryToken,
  useClass: NovelWriterRepositoryImpl,
};

export interface NovelWriterRepository {
  /**
   * 작가 정보 저장
   *
   * @param {Partial<NovelWriterEntity>} entity  작가 정보
   * @returns {Promise<void>}
   */
  saveRow(entity: Partial<NovelWriterEntity>): Promise<void>;

  /**
   * 작가 정보 여러개 저장
   *
   * @param {Partial<NovelWriterEntity>[]} entities 작가 정보 여러개
   * @returns {Promise<void>}
   */
  saveRows(entities: Partial<NovelWriterEntity>[]): Promise<void>;

  /**
   * 작가 정보 수정
   *
   * @param {number} id 작가 정보 id
   * @param {Partial<NovelWriterEntity>} entity 수정할 작가 정보
   * @returns {Promise<void>}
   */
  updateRow(id: number, entity: Partial<NovelWriterEntity>): Promise<void>;

  /**
   * 작가 정보 삭제
   *
   * @param {number} id 작가 정보 id
   * @returns {Promise<void>}
   */
  deleteRow(id: number): Promise<void>;

  /**
   * 작가 참여 인원 조회
   *
   * @param {number} novelRoomId 소설 공방 Id
   * @returns {Promise<number>}
   */
  countByNovelRoomId(novelRoomId: number): Promise<number>;

  /**
   * 작가 정보 조회
   *
   * @param {number} id 작가 정보 id
   * @returns {Promise<NovelWriterEntity>} 작가 정보
   */
  findById(id: number): Promise<NovelWriterEntity>;

  /**
   * 작가 정보 조회 (user id)
   *
   * @param {number} userId user id
   * @returns {Promise<NovelWriterEntity>} 작가 정보
   */
  findByUserIdAndNovelRoomId(novelRoomId: number, userId: number): Promise<NovelWriterEntity>;

  /**
   * 작가 정보 조회 (novel room id, writing seq)
   *
   * @param {number} novelRoomId 소설 공방 id
   * @param {number} writingSeq 작가 순서
   * @returns {Promise<NovelWriterEntity>} 작가 정보
   */
  findByNovelRoomIdAndWriterSeq(novelRoomId: number, writingSeq: number): Promise<NovelWriterEntity>;

  /**
   * 작가 정보 조회 (user email)
   *
   * @param {string} email 유저 이메일
   * @returns {Promise<NovelWriterEntity[]>} 작가 정보
   */
  findByUserEmail(email: string): Promise<NovelWriterEntity[]>;

  /**
   * 작가 정보 조회 (options)
   *
   * @param {FindOneOptions<NovelWriterEntity>} options
   * @returns {Promise<NovelWriterEntity[]>}
   */
  findByoptions(options: FindOneOptions<NovelWriterEntity>): Promise<NovelWriterEntity[]>;

  /**
   * 작가 정보 조회
   *
   * @param {number} novelRoomId 소설 공방 id
   * @returns {Promise<NovelWriterEntity[]>} 작가 정보 리스트
   */
  findByNovelRoomIdWhereAttending(novelRoomId: number): Promise<NovelWriterEntity[]>;

  /**
   * 작가 정보 조회 (user id, novel room id)
   *
   * @param {number} userId user id
   * @param {number} novelRoomId 소설 공방 id
   * @returns {Promise<NovelWriterEntity>}
   */
  findOneByUserIdAndNovelRoomId(userId: number, novelRoomId: number): Promise<NovelWriterEntity>;

  /**
   * 작가 정보 조회 (options)
   *
   * @param {FindOneOptions<NovelWriterEntity>} options
   * @returns {Promise<NovelWriterEntity>}
   */
  findOneByOptions(options: FindOneOptions<NovelWriterEntity>): Promise<NovelWriterEntity>;

  /**
   * 작가 정보 조회 (options)
   *
   * @param {number} id 소설 공방 id
   * @returns {Promise<NovelWriterEntity>} 작가 정보
   */
  findOneByIdWithNovelRoomAndUser(id: number): Promise<NovelWriterEntity>;

  /**
   * 소설 공방 참여중 작가 조회
   *
   * @param {number} novelRoomId
   * @returns {Promise<number>}
   */
  findBynovelRoomIdAttendingCount(novelRoomId: number): Promise<number>;

  /**
   * 소설 공방 작가 정보 조회 (페이징)
   *
   * @param {number} novelRoomId 소설 공방 id
   * @param {BasePaginationRequest} pagination 페이징 정보
   * @returns {Promise<[NovelWriterEntity[], number]>} 작가 정보 리스트
   */
  findByNovelRoomIdDetails(novelRoomId: number, pagination: BasePaginationRequest): Promise<[NovelWriterEntity[], number]>;

  /**
   * 소설 공방 작가 정보 조회
   *
   * @param {number} novelRoomId 소설 공방 id
   * @returns {Promise<NovelWriterEntity[]>} 작가 정보 리스트
   */
  findByNovelRoomIdJoinUser(novelRoomId: number): Promise<NovelWriterEntity[]>;
}
