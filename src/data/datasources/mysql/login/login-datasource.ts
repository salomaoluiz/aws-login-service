import { Inject, Injectable } from '@nestjs/common';
import ILoginDataSource from '@data/repositories/auth/login/login-datasource';
import { ISMSSender } from '@infra/sms-sender/sms-sender';

@Injectable()
export class LoginDatasource implements ILoginDataSource {
  constructor(
    @Inject('ISMSSender')
    private readonly smsSender: ISMSSender,
  ) {}

  async sendSMS(phone: string): Promise<string> {
    const confirmationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    await this.smsSender.sendSMS(
      phone,
      `Your confirmation code is ${confirmationCode}`,
    );

    return confirmationCode;
  }
}
