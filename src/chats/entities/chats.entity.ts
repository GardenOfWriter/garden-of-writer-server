import { MessageEntity } from '@app/message/message.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChatsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => UserEntity, (user) => user.chats)
  users: UserEntity[];

  @OneToMany(() => MessageEntity, (message) => message.chat)
  messages: MessageEntity;
}
