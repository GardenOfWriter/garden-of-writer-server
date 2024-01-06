export const EmailServiceToken = 'EmailService';

export interface EmailService {
  sendEmail(subject: string, to: string, text: string): Promise<void>;
}
