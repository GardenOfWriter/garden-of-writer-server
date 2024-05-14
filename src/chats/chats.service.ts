import { CreateChatDto } from '@app/chats/dto/create-chat.dto';
import { ChatsEntity } from '@app/chats/entities/chats.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatsEntity)
    private readonly chatsRepository: Repository<ChatsEntity>,
  ) {}

  async createChat(dto: CreateChatDto) {
    const chat = await this.chatsRepository.save({
      users: dto.userIds.map((id) => ({ id })),
    });
    return this.chatsRepository.findOne({
      where: {
        id: chat.id,
      },
    });
  }

  async checkIfChatExists(chatId: number) {
    const exists = await this.chatsRepository.exist({
      where: {
        id: chatId,
      },
    });
    return exists;
  }
}
