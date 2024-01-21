import { AbilityFactory } from '@app/commons/abilities/ability.factory';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private readonly abilityFactory: AbilityFactory, //
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const ability = this.abilityFactory.createForUser(user);
    const action = request.method.toLowerCase();

    // 요청이 들어온 리소스 및 액션에 대한 권한 확인
    return ability.can(action, request.params.entity);
  }
}
