import { MessageEntity } from '@app/message/message.entity';
import { PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateMessagesDto extends PickType(MessageEntity, ['message']) {
  @IsNumber()
  chatId: number;
}
