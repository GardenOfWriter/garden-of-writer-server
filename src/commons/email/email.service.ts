import { Provider } from '@nestjs/common';
import { EmailTemplate } from './enums/teamplate.enums';
import { EmailServiceImpl } from './email.service.impl';

export const EmailServiceToken = 'EmailService';

export const EmailServiceProvider: Provider = {
  provide: EmailServiceToken,
  useClass: EmailServiceImpl,
};
export interface EmailService {
  sendEmail({
    to,
    subject,
    text,
    template,
    teamplateArg,
  }: {
    to: string;
    subject: string;
    text: string;
    template?: EmailTemplate;
    teamplateArg?: any;
  }): Promise<void>;
}
