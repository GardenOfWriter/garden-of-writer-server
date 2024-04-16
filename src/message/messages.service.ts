import { CreateMessagesDto } from '@app/message/dto/create-messages.dto';
import { MessageEntity } from '@app/message/message.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsMessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messagesRepository: Repository<MessageEntity>,
  ) {}

  async createMessage(dto: CreateMessagesDto, authorId: number) {
    const message = await this.messagesRepository.save({
      chat: {
        id: dto.chatId,
      },
      author: {
        id: authorId,
      },
      message: dto.message,
    });

    return this.messagesRepository.findOne({
      where: {
        id: message.id,
      },
      relations: {
        chat: true,
      },
    });
  }
}
