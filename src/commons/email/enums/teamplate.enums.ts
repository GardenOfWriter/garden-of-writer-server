import { Enum, EnumType } from 'ts-jenum';

@Enum('path')
export class EmailTemplate extends EnumType<EmailTemplate>() {
  static readonly WRITER_ATTENDING = new EmailTemplate('[작가의 정원] 소설 공방 참여 승인', 'attending.hbs');
  static readonly WRITER_REJECT = new EmailTemplate('[작가의 정원] 소설 공방 참여 반려', 'attending-reject.hbs');
  static readonly TEMP_PASSWORD = new EmailTemplate('임시 패스워드 발급', 'temp-password.hbs');
  private constructor(
    readonly title: string,
    readonly path: string,
  ) {
    super();
  }
}
