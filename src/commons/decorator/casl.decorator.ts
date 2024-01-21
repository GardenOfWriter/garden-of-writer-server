import { AppAbility } from '@app/commons/abilities/ability.factory';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CaslAbility = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user ? (request.user.ability as AppAbility) : null;
  },
);
