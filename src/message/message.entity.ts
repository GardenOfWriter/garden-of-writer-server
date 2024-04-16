import { ChatsEntity } from '@app/chats/entities/chats.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ChatsEntity, (chat) => chat.messages)
  chat: ChatsEntity;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  author: UserEntity;

  @Column()
  @IsString()
  message: string;
}
