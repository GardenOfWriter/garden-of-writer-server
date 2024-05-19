import { FindOneOptions } from 'typeorm';
import { NovelTextEntity } from '../entities/novel-text.entity';
import { Inject } from '@nestjs/common';

export const NovelTextRepository = 'NovelTextRepository';

export const NovelTextRepo = () => Inject(NovelTextRepository);

/**
 * 소설 텍스트 정보 레포지토리
 *
 * @export
 * @interface NovelTextRepository
 * @typedef {NovelTextRepository}
 */
export interface NovelTextRepository {
  /**
   * 소설 텍스트 생성
   *
   * @param {Partial<NovelTextEntity>} entity 소설 텍스트 정보 엔티티
   * @returns {Promise<number>} 생성된 소설 텍스트 Id
   */
  addRow(entity: Partial<NovelTextEntity>): Promise<number>;

  /**
   * 소설 텍스트 수정
   *
   * @param {number} id 소설 텍스트 Id
   * @param {Partial<NovelTextEntity>} entity 소설 텍스트 정보 엔티티
   * @returns {Promise<void>}
   */
  updateRow(id: number, entity: Partial<NovelTextEntity>): Promise<void>;

  /**
   * 소설 텍스트 삭제
   *
   * @param {number} id 소설 텍스트 Id
   * @returns {Promise<void>}
   */
  deleteRow(id: number): Promise<void>;

  /**
   * 소설 텍스트 조회
   *
   * @param {FindOneOptions<NovelTextEntity>} options 조회 옵션
   * @returns {Promise<NovelTextEntity[]>}  조회된 소설 텍스트 정보 엔티티
   */
  findByChapterId(chapterId: number): Promise<NovelTextEntity[]>;

  /**
   * 소설 텍스트 상세정보 조회
   *
   * @param {number} id 소설 텍스트 Id
   * @returns {Promise<NovelTextEntity>} 조회된 소설 텍스트 정보 엔티티
   */
  findById(id: number): Promise<NovelTextEntity>;
}
