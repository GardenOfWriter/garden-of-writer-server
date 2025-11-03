import { AbilityFactory, ActionEnum } from '@app/commons/abilities/ability.factory';
import { NotAccessWriterManagementExcetpion } from '@app/novel-writer/exceptions/novel-writer.exception';
import { UserEntity } from '@app/user/entities/user.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class HostGuard implements CanActivate {
  constructor(private readonly abilityFactory: AbilityFactory) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const user = request.user as UserEntity;
    const novelRoomId = +request.params.id;

    const ability = await this.abilityFactory.createByHost(user, novelRoomId);
    if (!ability.can(ActionEnum.Manager, 'all')) {
      throw new NotAccessWriterManagementExcetpion();
    }
    return true;
  }
}
