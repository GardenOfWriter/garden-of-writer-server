import { AuthModule } from '@app/auth/auth.module';
import { ChatsGateway } from '@app/chats/chats.gateway';
import { UserModule } from '@app/user/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { NovelRoomModule } from '@app/novel-room/novel-room.module';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => NovelRoomModule), UserModule],
  providers: [ChatsGateway],
  exports: [ChatsGateway],
})
export class ChatsModule {}
