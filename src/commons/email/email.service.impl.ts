import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';
import { compile } from 'handlebars';
import { join } from 'path';
import { readFileSync } from 'fs';
import { EmailTemplate } from './enums/teamplate.enums';
@Injectable()
export class EmailServiceImpl implements EmailService {
  constructor(private readonly mailService: MailerService) {}
  //   private logger = new Logger('EmailService');
  async sendEmail(
    to: string,
    subject: string,
    text: string,
    template?: EmailTemplate,
    templateArgs?: any,
  ): Promise<void> {
    let templateMessage;
    if (template) {
      templateMessage = this.getTemplate(template, templateArgs);
    }
    const mailOptions: ISendMailOptions = {
      to,
      from: 'tb25271@gmail.com',
      subject: subject,
      text,
      replyTo: 'noply@novel-room.com',
      html: templateMessage,
    };
    await this.mailService.sendMail(mailOptions);
  }
  private getTemplate(emailTemplate: EmailTemplate, teamplateArgs: any) {
    const teamplatePath = join(
      process.env.PWD,
      `/templates/${emailTemplate.path}`,
    );
    const emailTemplateSource = readFileSync(teamplatePath, 'utf8');
    const template = compile(emailTemplateSource);
    const htmlSendMessage = template({ ...teamplateArgs });
    return htmlSendMessage;
  }
}
