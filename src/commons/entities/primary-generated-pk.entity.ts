import { BaseEntity, Generated, PrimaryColumn } from 'typeorm';
import { BigintValueTransformer } from './transformer/bigint-value.transformer';

import { IdNotMatchException } from './exception/id-not-match.exception';

export abstract class PrimaryGeneratedPkEntity extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', transformer: new BigintValueTransformer() })
  id: number;

  validateId(id: number) {
    const isValidId = this.id === id;
    if (!isValidId) {
      throw new IdNotMatchException();
    }
  }
}
