import { CaslGuard } from '@app/auth/guard/casl.guard';
import { Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';

@Module({
  providers: [AbilityFactory, CaslGuard],
  exports: [AbilityFactory, CaslGuard],
})
export class AbilityModule {}
