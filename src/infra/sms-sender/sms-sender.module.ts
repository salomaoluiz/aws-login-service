import { Module } from '@nestjs/common';
import { AwsSMSSenderModule } from './aws/sms-sender.module';

@Module({
  imports: [AwsSMSSenderModule],
  exports: [AwsSMSSenderModule],
})
export class SMSSenderModule {}
