import { Enum, EnumType } from 'ts-jenum';

@Enum('path')
export class EmailTemplate extends EnumType<EmailTemplate>() {
  static readonly WRITER_ATTENDING = new EmailTemplate(
    '[작가의 정원] 소설 공방 참여 승인',
    'attending.hbs',
  );
  static readonly WRITER_REJECT = new EmailTemplate(
    '[작가의 정원] 소설 공방 참여 반려',
    'attending-reject.hbs',
  );

  private constructor(
    readonly _title: string,
    readonly _path: string,
  ) {
    super();
  }

  get title(): string {
    return this._title;
  }
  get path(): string {
    return this._path;
  }
}
