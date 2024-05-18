import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { NovelRoomRepository, NovelRoomRepositoryToken } from '@app/novel-room/repository/novel-room.repository';

export enum ActionEnum {
  Manager = 'manager',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Create = 'create',
}

export type Subjects = InferSubjects<typeof UserEntity | 'Room'> | 'all';

export type AppAbility = Ability<[ActionEnum, Subjects]>;

@Injectable()
export class AbilityFactory {
  constructor(
    @Inject(NovelRoomRepositoryToken)
    private readonly roomRepository: NovelRoomRepository,
  ) {}

  createForUser(user: UserEntity) {
    const { can, build, cannot } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
    if (user.id === 1) {
      can(ActionEnum.Manager, 'all');
    } else {
      can(ActionEnum.Read, 'all');
      can(ActionEnum.Update, UserEntity, { id: user.id });
      can(ActionEnum.Delete, UserEntity, { id: user.id });
    }
    return build({
      detectSubjectType: (type) => type.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
