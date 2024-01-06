import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';

@Injectable()
export class EmailServiceImpl implements EmailService {
  constructor(private readonly mailService: MailerService) {}
  //   private logger = new Logger('EmailService');
  async sendEmail(subject: string, to: string, text: string): Promise<void> {
    const mailOptions: ISendMailOptions = {
      to,
      from: 'tb25271@gmail.com',
      subject: subject,
      text,
      replyTo: 'noply@novel-room.com',
    };
    await this.mailService.sendMail(mailOptions);
  }
}
