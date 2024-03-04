import { NotAccessParticiateWriterExcetpion } from '@app/novel-writer/exceptions/not-access-particiate-writer.excetpion';
import { Test, TestingModule } from '@nestjs/testing';

describe('TagRepository', () => {
  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [RedisModule.register({})],
    //   providers: [TagRepository],
    // }).compile();
    // repository = module.get<TagRepository>(TagRepository);
    // redisClient = module.get<IORedis.Redis>('RedisService');
  });

  it('should call zrevrangebyscore and return result', async () => {});
});
