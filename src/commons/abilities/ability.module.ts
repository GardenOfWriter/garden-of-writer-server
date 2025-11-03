import { Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';
import { NovelWriterRepositoryProvider } from '@app/novel-writer/repository/novel-writer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovelWriterEntity } from '@app/novel-writer/entities/novel-writer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NovelWriterEntity])],
  providers: [AbilityFactory, NovelWriterRepositoryProvider],
  exports: [AbilityFactory],
})
export class AbilityModule {}
