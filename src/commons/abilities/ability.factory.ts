import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../user/entities/user.entity';
import { NovelWriterRepository, NovelWriterRepositoryToken } from '@app/novel-writer/repository/novel-writer.repository';

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
    @Inject(NovelWriterRepositoryToken)
    private readonly novelWriterRepo: NovelWriterRepository,
  ) {}

  async createByHost(user: UserEntity, novelRoomId: number) {
    const { can, build, cannot } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
    const writer = await this.novelWriterRepo.findByUserIdAndNovelRoomId(novelRoomId, user.id);
    if (writer.isHost()) {
      can(ActionEnum.Manager, 'all');
    }
    return build({
      detectSubjectType: (type) => type.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
