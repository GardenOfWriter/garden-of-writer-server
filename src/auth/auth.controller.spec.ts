import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

const authTestTag = '[AUTH]';
const TEST_SUIT = {
  LOGIN: `LOGIN 테스트`,
};
const RESULT = {
  SUCCESS: '성공',
  FAIL: '실패',
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it(`${authTestTag}:${TEST_SUIT.LOGIN}:${RESULT.SUCCESS}`, () => {
    expect(controller).toBeDefined();
  });
});
