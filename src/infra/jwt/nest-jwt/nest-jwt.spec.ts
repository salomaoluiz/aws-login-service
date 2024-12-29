import { Test, TestingModule } from '@nestjs/testing';
import { NestJwt } from './nest-jwt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@infra/config/config.service';

describe('NestJwt', () => {
  let provider: NestJwt;
  const JwtServiceMock = {
    sign: jest.fn(),
    verify: jest.fn(),
  };
  const configServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NestJwt,
        {
          provide: JwtService,
          useValue: JwtServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    provider = module.get<NestJwt>(NestJwt);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
