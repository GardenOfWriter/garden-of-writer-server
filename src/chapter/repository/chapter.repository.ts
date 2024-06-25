import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { FindOneOptions } from 'typeorm';
import { ChapterEntity } from '../entities/chapter.entity';
import { Inject, Provider } from '@nestjs/common';
import { ChapterRepositoryImpl } from './chapter.repository.impl';

export const ChapterRepositoryToken = 'ChapterRepository';

export const ChapterRepo = () => Inject(ChapterRepositoryToken);

export const ChapterRepositoryProvider: Provider = {
  provide: ChapterRepositoryToken,
  useClass: ChapterRepositoryImpl,
};

/**
 * 회차 정보 레포지토리
 *
 * @export
 * @interface ChapterRepository
 * @typedef {ChapterRepository}
 */
export interface ChapterRepository {
  /**
   * 회차 정보 저장
   *
   * @param {Partial<ChapterEntity>} entity  회차 정보
   * @returns {Promise<void>}
   */
  saveRow(entity: Partial<ChapterEntity>): Promise<void>;

  /**
   * 회차 정보 수정
   *
   * @param {number} id 회차 Id
   * @param {Partial<ChapterEntity>} entity 수정할 회차 정보
   * @returns {Promise<void>}
   */
  updateRow(id: number, entity: Partial<ChapterEntity>): Promise<void>;

  /**
   * 회차 정보 삭제
   *
   * @param {number} id 회차 Id
   * @returns {Promise<void>}
   */
  deleteRow(id: number): Promise<void>;

  /**
   * 회차 정보 조회
   *
   * @param {FindOneOptions<ChapterEntity>} options 조회 옵션
   * @returns {Promise<ChapterEntity[]>}  조회된 회차 정보
   */
  findByoptions(options: FindOneOptions<ChapterEntity>): Promise<ChapterEntity[]>;

  /**
   * 회차 정보 검색
   *
   * @param {number} id 회차 Id
   * @returns {Promise<ChapterEntity>} 검색된 회차 정보
   */
  findOneLatestByIdJoinNovelRoom(id: number, options: { orderBy: 'ASC' | 'DESC' }): Promise<ChapterEntity>;

  /**
   * 회차 정보 조회 및 개수 조회 (페이징 처리)
   *
   * @param {number} novelRoomId 소설 공방 id
   * @param {BasePaginationRequest} pagination 페이징 정보
   * @returns {Promise<[ChapterEntity[], number]>} 조회된 회차 정보 및 개수
   */
  findChpaterByRoomIdAndCount(novelRoomId: number, pagination: BasePaginationRequest): Promise<[ChapterEntity[], number]>;

  /**
   * 회차 정보 조회
   *
   * @param {FindOneOptions<ChapterEntity>} options
   * @returns {Promise<ChapterEntity>}
   */
  findOneByOptions(options: FindOneOptions<ChapterEntity>): Promise<ChapterEntity>;

  /**
   *  회차 정보 조회
   *
   * @param {number} noveRoomId 소설 공방 id
   * @returns {Promise<number>} 조회된 회차 정보
   */
  countByNovelRoomId(noveRoomId: number): Promise<number>;

  /**
   * 회차 정보 조회 (ID로 조회)
   *
   * @param {number} id 회차 ID
   * @returns {Promise<ChapterEntity>} 조회된 회차 정보
   */
  findById(id: number): Promise<ChapterEntity>;
}
