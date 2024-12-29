import { Test, TestingModule } from '@nestjs/testing';
import { AWSSMSSender } from './sms-sender';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';

describe('AWSSMSSender', () => {
  let provider: AWSSMSSender;
  const snsClient = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AWSSMSSender,
        {
          provide: SNSClient,
          useValue: snsClient,
        },
      ],
    }).compile();

    provider = module.get<AWSSMSSender>(AWSSMSSender);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should send sms', async () => {
    const phone = '123456789';
    const message = 'Hello World!';

    await provider.sendSMS(phone, message);

    expect(snsClient.send).toHaveBeenCalledTimes(1);
    expect(snsClient.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          Message: message,
          PhoneNumber: phone,
        },
      }),
    );
  });
});
