import { JoinColumn, ManyToOne } from 'typeorm';
import { PrimaryGeneratedPkWithMetaTimeEntity } from './primary-generated-pk-with-meta-time.entity';
import { userEntity } from '@app/user/entities/user.entity';

export abstract class PrimaryAuditiedPK extends PrimaryGeneratedPkWithMetaTimeEntity {
  @ManyToOne((type) => userEntity)
  createdBy: userEntity;

  @ManyToOne((type) => userEntity)
  updatedBy: userEntity;
}
