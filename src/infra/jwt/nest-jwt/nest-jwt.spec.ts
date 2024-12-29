import { Test, TestingModule } from '@nestjs/testing';
import { NestJwt } from './nest-jwt';

describe('NestJwt', () => {
  let provider: NestJwt;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestJwt],
    }).compile();

    provider = module.get<NestJwt>(NestJwt);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
