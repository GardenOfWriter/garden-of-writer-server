import { Provider } from '@nestjs/common';
import { EmailTemplate } from './enums/teamplate.enums';
import { EmailServiceImpl } from './email.service.impl';
import { GmailWatcherService } from './email.watcher';

export const EmailServiceToken = 'EmailService';

export const EmailServiceProvider: Provider = {
  provide: EmailServiceToken,
  useClass: GmailWatcherService,
};
export interface EmailService {
  sendEmail({
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
  }): Promise<void>;
}
