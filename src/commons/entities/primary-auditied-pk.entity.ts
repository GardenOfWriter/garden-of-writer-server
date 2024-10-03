import { UserEntity } from '@app/user/entities/user.entity';
import { ManyToOne } from 'typeorm';
import { PrimaryGeneratedPkWithMetaTimeEntity } from './primary-generated-pk-with-meta-time.entity';
import { AutoMap } from '@automapper/classes';
import { UserNickName } from '@app/user/entities/user-nickname';

export abstract class PrimaryAuditiedPK extends PrimaryGeneratedPkWithMetaTimeEntity {
  @AutoMap(() => UserNickName)
  @ManyToOne((type) => UserEntity)
  createdBy: UserEntity;

  @AutoMap(() => UserNickName)
  @ManyToOne((type) => UserEntity)
  updatedBy: UserEntity;
}
