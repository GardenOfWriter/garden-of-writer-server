import { UserNickName } from '@app/user/entities/user-nickname';
import { AutoMap } from '@automapper/classes';

export class FindByChapterIdCommentResDto {
  @AutoMap()
  id: number;

  @AutoMap()
  comment: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;

  @AutoMap(() => UserNickName)
  createdBy: UserNickName;
}
