import { Inject, Provider } from '@nestjs/common';
import { NovelRoomRepositoryImpl } from './novel-room.repository.impl';
import { UserEntity } from '@app/user/entities/user.entity';
import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { NovelRoomEntity } from '../entities/novel-room.entity';
import { WriterStatusType } from '@app/novel-writer/entities/enums/writer-status.enum';

export const NovelRoomRepositoryToken = 'NovelRoomRepository';

export const NovelRoomRepo = () => {
  return Inject(NovelRoomRepositoryToken);
};

export const NovelRoomRepositoryProvider: Provider = {
  provide: NovelRoomRepositoryToken,
  useClass: NovelRoomRepositoryImpl,
};

export interface NovelRoomRepository {
  findAllWithUserAndCount(
    user: UserEntity,
    pagination: BasePaginationRequest,
  ): Promise<[NovelRoomEntity[], number]>;

  findAllJoinBoardWithBoardLikeAndCount(
    user: UserEntity,
    pagination: BasePaginationRequest,
  ): Promise<[NovelRoomEntity[], number]>;
  findAllJoinWriterByStatus(
    user: UserEntity,
    writerStatus: WriterStatusType[],
    pagination: BasePaginationRequest,
  ): Promise<[NovelRoomEntity[], number]>;

  saveRow(entity: NovelRoomEntity): Promise<void>;
  getByIdWithTag(id: number): Promise<NovelRoomEntity>;
  getById(id: number): Promise<NovelRoomEntity>;
  existTitle(title: string): Promise<boolean>;
  deleteRow(id: number): Promise<void>;
}
