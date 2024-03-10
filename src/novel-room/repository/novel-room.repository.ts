import { Provider } from '@nestjs/common';
import { NovelRoomRepositoryImpl } from './novel-room.repository.impl';
import { UserEntity } from '@app/user/entities/user.entity';
import { BasePaginationRequest } from '@app/commons/pagination/base-paginiation.request';
import { NovelRoomEntity } from '../entities/novel-room.entity';

export const NovelRoomRepositoryToken = 'NovelRoomRepository';

export const NovelRoomRepositoryProvider: Provider = {
  provide: NovelRoomRepositoryToken,
  useClass: NovelRoomRepositoryImpl,
};

export interface NovelRoomRepository {
  findAllWithUserAndCount(
    user: UserEntity,
    pagination: BasePaginationRequest,
  ): Promise<[NovelRoomEntity[], number]>;
}
