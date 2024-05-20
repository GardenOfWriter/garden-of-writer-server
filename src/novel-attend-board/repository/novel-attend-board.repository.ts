import { Inject, Provider } from '@nestjs/common';
import { NovelAttendBoardEntity } from '../entities/novel-attend-board.entity';
import { NovelAttendBoardRepositoryImpl } from './novel-attend-board.repository.impl';
import { BoardLikeEntity } from '../entities/board-like.entity';

export const NovelAttendBoardRepositryToken = 'NovelAttendBoardRepository';

export const NovelRoomBoardRepo = () => Inject(NovelAttendBoardRepositryToken);

export const NovelAttendBoardRepositoryProvider: Provider = {
  provide: NovelAttendBoardRepositryToken,
  useClass: NovelAttendBoardRepositoryImpl,
};

/**
 * 소설 공방 게시판 정보 레포지토리
 *
 * @export
 * @interface NovelAttendBoardRepository
 * @typedef {NovelAttendBoardRepository}
 */
export interface NovelAttendBoardRepository {
  /**
   * 공방 모집 게시글 생성
   *
   * @param {Partial<NovelAttendBoardEntity>} entity 게시글 엔티티
   * @returns {Promise<void>}
   */
  addRow(entity: Partial<NovelAttendBoardEntity>): Promise<void>;

  /**
   * 공방 모집 게시글 수정
   *
   * @param {number} id 게시글 번호
   * @param {Partial<NovelAttendBoardEntity>} entity 게시글 정보 엔티티
   * @returns {Promise<void>}
   */
  updateRow(id: number, entity: Partial<NovelAttendBoardEntity>): Promise<void>;

  /**
   *  공방 모집 게시글 삭제
   *
   * @param {number} id 게시글 번호
   * @returns {Promise<void>}
   */
  deleteRow(id: number): Promise<void>;

  /**
   * 공방 모집 게시글 조회
   *
   * @param {number} id 게시글 번호
   * @returns {Promise<NovelAttendBoardEntity>} 조회된 게시글 엔티티
   */
  findById(id: number): Promise<NovelAttendBoardEntity>;

  /**
   * 공방 모집 게시글 조회 (소설 공방 정보 포함)
   *
   * @returns {Promise<[NovelAttendBoardEntity[], number]>}
   */
  findWithNovelRoom(): Promise<[NovelAttendBoardEntity[], number]>;

  /**
   *  게시글 조회 (유저 좋아요 여부 및 공방 정보 포함))
   *
   * @param {number} novelRoomId 공방 Id
   * @returns {Promise<NovelAttendBoardEntity>} 조회된 게시글 정보 엔티티
   */
  findByIdWhereLikeUserJoinNovelRoom(novelRoomId: number): Promise<NovelAttendBoardEntity>;

  /**
   * 게시글 좋아요 여부 확인
   *
   * @param {number} userId 유저 Id
   * @param {number} novelRoomId 공방 Id
   * @returns {Promise<boolean>}  좋아요 여부
   */
  hasBoardLike(userId: number, novelRoomId: number): Promise<boolean>;

  /**
   * 게시글 좋아요 생성
   *
   * @param {BoardLikeEntity} boardLike 게시글 좋아요 엔티티
   * @returns {Promise<void>}
   */
  createBoardLike(boardLike: BoardLikeEntity): Promise<void>;

  /**
   * 게시글 좋아요 삭제
   *
   * @param {number} novelRoomId 공방 Id
   * @returns {Promise<number>} 조회된 좋아요 수
   */
  getByIdBoardLike(novelRoomId: number): Promise<number>;
}
