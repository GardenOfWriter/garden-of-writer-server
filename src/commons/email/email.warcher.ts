import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';
import { compile } from 'handlebars';
import { join } from 'path';
import { readFileSync } from 'fs';
import { EmailTemplate } from './enums/teamplate.enums';
import { Worker } from 'worker_threads';
@Injectable()
export class GmailWatcherService implements EmailService {
  constructor(private readonly mailService: MailerService) {}
  //   private logger = new Logger('EmailService');

  async sendEmail({
    text,
    to,
    subject,
    template,
    templateArgs,
  }: {
    to: string;
    subject: string;
    text: string;
    template?: EmailTemplate;
    templateArgs?: any;
  }): Promise<any> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(join(__dirname, '../../../dist/commons/email/email.worker-thread.js'), {
        workerData: { to, subject, text, template: EmailTemplate.TEMP_PASSWORD, templateArgs },
      });

      worker.on('message', resolve); // 메인 스레드로부터 성공 메시지 수신
      worker.on('error', reject); // 워커 스레드에서 발생한 오류 수신
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }
}
