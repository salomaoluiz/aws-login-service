import { Test, TestingModule } from '@nestjs/testing';
import { GetUserUseCase } from './get-user-use-case';

describe('GetUserUseCase', () => {
  let provider: GetUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserUseCase],
    }).compile();

    provider = module.get<GetUserUseCase>(GetUserUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
