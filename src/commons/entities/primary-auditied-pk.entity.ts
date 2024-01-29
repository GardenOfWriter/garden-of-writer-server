import { UserEntity } from '@app/user/entities/user.entity';
import { ManyToOne } from 'typeorm';
import { PrimaryGeneratedPkWithMetaTimeEntity } from './primary-generated-pk-with-meta-time.entity';

export abstract class PrimaryAuditiedPK extends PrimaryGeneratedPkWithMetaTimeEntity {
  @ManyToOne((type) => UserEntity)
  createdBy: UserEntity;

  @ManyToOne((type) => UserEntity)
  updatedBy: UserEntity;
}
