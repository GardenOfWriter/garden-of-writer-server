import { Inject, Provider } from '@nestjs/common';
import { NovelRoomRepositoryImpl } from './novel-room.repository.impl';
import { UserEntity } from '@app/user/entities/user.entity';
import { BasePaginationRequest, BasePaginationRequest as Pagination } from '@app/commons/pagination/base-paginiation.request';
import { NovelRoomEntity } from '../entities/novel-room.entity';
import { WriterStatusType } from '@app/novel-writer/entities/enums/writer-status.enum';
import { NovelRoomCategoryType } from '../entities/enum/novel-room-category.enum';
import { NovelRoomStatusReqEnum } from '@app/novel-view/dto/response/find-all-novel-response.dto';

export const NovelRoomRepositoryToken = 'NovelRoomRepository';

export const NovelRoomRepo = () => {
  return Inject(NovelRoomRepositoryToken);
};

export const NovelRoomRepositoryProvider: Provider = {
  provide: NovelRoomRepositoryToken,
  useClass: NovelRoomRepositoryImpl,
};

/**
 * 소설 공방 정보 레포지토리
 *
 * @export
 * @interface NovelRoomRepository
 * @typedef {NovelRoomRepository}
 */
export interface NovelRoomRepository {
  /**
   * 소설 공방 목록  (공방 좋아요 포함)
   * @param {UserEntity} user 사용자 정보
   * @param {Pagination} pagination 페이징 정보
   * @returns {Promise<[NovelRoomEntity[], number]>} 조회된 소설 공방 목록 (페이징 처리)
   */
  findAllWithUserAndCount(user: UserEntity, pagination: Pagination): Promise<[NovelRoomEntity[], number]>;

  /**
   * 소설 공방 목록 조회 (게시판 좋아요 포함)
   * @param {UserEntity} user 사용자 정보
   * @param {Pagination} pagination 페이징 정보
   * @returns {Promise<[NovelRoomEntity[], number]>} 조회된 소설 공방 목록 (페이징 처리)
   */
  findAllJoinBoardWithBoardLikeAndCount(user: UserEntity, pagination: Pagination): Promise<[NovelRoomEntity[], number]>;

  /**
   * 소설 공방 목록 조회 (작가 상태 포함)
   *
   * @param {UserEntity} user   사용자 정보
   * @param {WriterStatusType[]} writerStatus   작가 상태
   * @param {Pagination} pagination 페이징 정보
   * @returns {Promise<[NovelRoomEntity[], number]>}  조회된 소설 공방 목록 (페이징 처리)
   */
  findAllJoinWriterByStatus(user: UserEntity, writerStatus: WriterStatusType[], pagination: Pagination): Promise<[NovelRoomEntity[], number]>;

  findAllByStatusAndCategoryJoinWriter({
    category,
    status,
    paging,
  }: {
    category: NovelRoomCategoryType;
    status: NovelRoomStatusReqEnum;
    paging: BasePaginationRequest;
  }): Promise<[NovelRoomEntity[], number]>;

  /**
   * 소설 공방 조회
   *
   * @param {NovelRoomEntity} entity  조회할 소설 공방 정보
   * @returns {Promise<void>}
   */
  saveRow(entity: NovelRoomEntity): Promise<void>;

  /**
   * 소설 공방 조회

   * @param {number} id 조회할 소설 공방 id 
   * @returns {Promise<NovelRoomEntity>} 조회된 소설 공방 정보 (공방 태그 포함)
   */
  getByIdWithTag(id: number): Promise<NovelRoomEntity>;

  /**
   * 소설 공방 조회
   *
   * @param {number} id 조회할 소설 공방 id
   * @returns {Promise<NovelRoomEntity>}  조회된 소설 공방 정보
   */
  getById(id: number): Promise<NovelRoomEntity>;

  /**
   * 소설 공방 이름 존재 여부 조회
   *
   * @param {string} title 소설 공방 이름
   * @returns {Promise<boolean>} 소설 공방 이름 존재 여부
   */
  existTitle(title: string): Promise<boolean>;

  /**
   * 소설 공방 삭제
   *
   * @param {number} id 삭제할 소설 공방 id
   * @returns {Promise<void>}
   */
  deleteRow(id: number): Promise<void>;
}
