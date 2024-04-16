import { ChatsMessagesService } from '@app/message/messages.service';
import { Controller } from '@nestjs/common';

@Controller('chats/:cid/messages')
export class MessagesController {
  constructor(private readonly messagesService: ChatsMessagesService) {}
}
