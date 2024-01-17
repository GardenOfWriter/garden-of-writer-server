import { userEntity } from '@app/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { AbilityFactory, ActionEnum } from './ability.factory';

@Injectable()
export class ActionsFactory {
  constructor(
    private readonly abilityFactory: AbilityFactory, //
  ) {}

  async canModifyRoom(user: userEntity): Promise<boolean> {
    const ability = this.abilityFactory.createForUser(user);
    return ability.can(ActionEnum.Update, 'all');
  }

  async canDeleteRoom(user: userEntity): Promise<boolean> {
    const ability = this.abilityFactory.createForUser(user);
    return ability.can(ActionEnum.Delete, 'all');
  }
}
