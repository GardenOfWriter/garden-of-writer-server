import { Column } from 'typeorm';
import { BigintValueTransformer } from './transformer/bigint-value.transformer';
import { PrimaryGeneratedPkWithMetaTimeEntity } from './primary-generated-pk-with-meta-time.entity';

export abstract class PrimaryAuditiedPK extends PrimaryGeneratedPkWithMetaTimeEntity {
  @Column({ type: 'bigint', transformer: new BigintValueTransformer() })
  createdBy: number;
  @Column({ type: 'bigint', transformer: new BigintValueTransformer() })
  updatedBy: string;
}
