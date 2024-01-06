import { EmailTemplate } from './enums/teamplate.enums';

export const EmailServiceToken = 'EmailService';

export interface EmailService {
  sendEmail(
    to: string,
    subject: string,
    text: string,
    template?: EmailTemplate,
    teamplateArg?: any,
  ): Promise<void>;
}
