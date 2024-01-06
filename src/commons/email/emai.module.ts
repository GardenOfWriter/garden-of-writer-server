import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailServiceToken } from './email.service';
import { EmailServiceImpl } from './email.service.impl';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        return {
          transport: {
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
              type: 'OAUTH2',
              user: process.env.MAIL_USER,
              clientId: process.env.MAIL_CLIENT_ID,
              clientSecret: process.env.MAIL_CLIENT_SECRET,
              refreshToken: process.env.MAIL_REFRESH_TOKEN,
            },
          },
        };
      },
    }),
  ],

  providers: [
    {
      provide: EmailServiceToken,
      useClass: EmailServiceImpl,
    },
  ],
  exports: [
    {
      provide: EmailServiceToken,
      useClass: EmailServiceImpl,
    },
  ],
})
export class EmailModule {}
