import { Module } from '@nestjs/common';
import { SNSClient } from '@aws-sdk/client-sns';
import { ConfigService } from '@infra/config/config.service';
import { AWSSMSSender } from '@infra/sms-sender/aws/sms-sender';
import { ConfigModule } from '@infra/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: SNSClient,
      useFactory: (config: ConfigService) =>
        new SNSClient({
          region: config.AWS_REGION,
          credentials: {
            accessKeyId: config.AWS_ACCESS_KEY_ID,
            secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
          },
        }),
      inject: [ConfigService],
    },
    {
      provide: 'ISMSSender',
      useClass: AWSSMSSender,
    },
  ],
  exports: ['ISMSSender'],
})
export class AwsSMSSenderModule {}
