import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from './logger';

describe('Logger', () => {
  const logSpy = jest.spyOn(console, 'log');
  const errorSpy = jest.spyOn(console, 'error');
  const warnSpy = jest.spyOn(console, 'warn');

  let provider: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Logger],
    }).compile();

    provider = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should log an info', () => {
    provider.info('Some INFO message', { some: 'data' });
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('Some INFO message', { some: 'data' });
  });

  it('should log an warn', () => {
    const error = new Error('Some WARN error');
    provider.warn('Some WARN message', error, { some: 'data' });
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('Some WARN message', error, {
      some: 'data',
    });
  });

  it('should log an error', () => {
    const error = new Error('Some ERROR error');
    provider.error('Some ERROR message', error, { some: 'data' });
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith('Some ERROR message', error, {
      some: 'data',
    });
  });
});
