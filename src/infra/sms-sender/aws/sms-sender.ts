import { Injectable } from '@nestjs/common';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { ISMSSender } from '@infra/sms-sender/sms-sender';

@Injectable()
export class AWSSMSSender implements ISMSSender {
  constructor(private readonly snsClient: SNSClient) {}

  async sendSMS(phone: string, message: string): Promise<void> {
    const params = {
      Message: message,
      PhoneNumber: phone,
    };

    const command = new PublishCommand(params);

    await this.snsClient.send(command);
  }
}
