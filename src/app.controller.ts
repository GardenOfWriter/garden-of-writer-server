import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService, EmailServiceToken } from './commons/email/email.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(EmailServiceToken)
    private readonly emailService: EmailService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    try {
      await this.emailService.sendEmail(
        '[작가의 정원] 소설 공방 참여 승인',
        'tb2527@naver.com',
        '[닉네임 반영]님 안녕하세요\n[소설 공방 제목] 소설 공방의 참여가 승인되었습니다.\n꾸준하고 적극적인 활동 부탁드립니다.',
      );
    } catch (error) {
      console.log(error);
    }
    return this.appService.getHello();
  }
}
