import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';
import { join } from 'path';
import { EmailTemplate } from './enums/teamplate.enums';
import { Worker } from 'worker_threads';
@Injectable()
export class GmailWatcherService implements EmailService {
  async sendEmail({
    to,
    subject,
    text,
    template,
    context,
  }: {
    to: string;
    subject: string;
    text: string;
    template: EmailTemplate;
    context: any;
  }): Promise<void> {
    const worker = new Worker(join(__dirname, '../../../dist/commons/email/email.worker-thread.js'), {
      workerData: { to, subject, text, template, context },
    });
    // worker.on('message',); // 메인 스레드로부터 성공 메시지 수신
    // worker.on('error', reject); // 워커 스레드에서 발생한 오류 수신
    worker.on('exit', (code) => {
      if (code !== 0) {
        new Error(`Worker stopped with exit code ${code}`);
      }
    });
  }
}
