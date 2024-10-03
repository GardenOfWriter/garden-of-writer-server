import { AutoMap } from '@automapper/classes';

export class UserNickName {
  @AutoMap()
  readonly id: number;

  @AutoMap()
  readonly nickname: string;
}
