import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  const logSpy = jest.spyOn(console, 'log');
  const errorSpy = jest.spyOn(console, 'error');
  const warnSpy = jest.spyOn(console, 'warn');

  let service: LoggerService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should log an info', () => {
    service.info('Some INFO message', { some: 'data' });
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('Some INFO message', { some: 'data' });
  });

  it('should log an warn', () => {
    const error = new Error('Some WARN error');
    service.warn('Some WARN message', error, { some: 'data' });
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('Some WARN message', error, {
      some: 'data',
    });
  });

  it('should log an error', () => {
    const error = new Error('Some ERROR error');
    service.error('Some ERROR message', error, { some: 'data' });
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith('Some ERROR message', error, {
      some: 'data',
    });
  });
});
