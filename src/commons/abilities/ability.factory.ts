import { NovelRoomEntity } from '@app/novel-board/entities/novel-room.entity';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userEntity } from '../../user/entities/user.entity';

export enum ActionEnum {
  Manager = 'manager',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Create = 'create',
}

export type Subjects = InferSubjects<typeof userEntity | 'Room'> | 'all';

export type AppAbility = Ability<[ActionEnum, Subjects]>;

@Injectable()
export class AbilityFactory {
  constructor(
    @InjectRepository(NovelRoomEntity)
    private readonly roomRepository: Repository<NovelRoomEntity>,
  ) {}

  createForUser(user: userEntity) {
    const { can, build, cannot } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );
    if (user.id === 1) {
      can(ActionEnum.Manager, 'all');
    } else {
      can(ActionEnum.Read, 'all');
      can(ActionEnum.Update, userEntity, { id: user.id });
      can(ActionEnum.Delete, userEntity, { id: user.id });
    }
    return build({
      detectSubjectType: (type) =>
        type.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
