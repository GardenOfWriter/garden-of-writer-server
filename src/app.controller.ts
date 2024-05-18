import { Body, Controller, Delete, Get, Inject, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService, EmailServiceToken } from './commons/email/email.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
  // @ApiTags('test')
  // @ApiOperation({
  //   description: '바디값 테스트[GET]',
  // })
  // @Get('body/get')
  // getBody(@Query('isBody') check: boolean) {
  //   if (check) {
  //     return 'test';
  //   } else {
  //     return;
  //   }
  // }
  // @ApiTags('test')
  // @ApiOperation({
  //   description: '바디값 테스트[POST]',
  // })
  // @Post('body/post')
  // postBody(@Body('isBody') check: boolean) {
  //   if (check) {
  //     return 'test';
  //   } else {
  //     return;
  //   }
  // }
  // @ApiTags('test')
  // @ApiOperation({
  //   description: '바디값 테스트[PUT]',
  // })
  // @Put('body/put')
  // putBody(@Body('isBody') check: boolean) {
  //   if (check) {
  //     return 'test';
  //   } else {
  //     return;
  //   }
  // }
  // @ApiTags('test')
  // @ApiOperation({
  //   description: '바디값 테스트[DELETE]',
  // })
  // @Delete('body/delete')
  // deleteBody(@Body('isBody') check: boolean) {
  //   if (check) {
  //     return 'test';
  //   } else {
  //     return;
  //   }
  // }
}
