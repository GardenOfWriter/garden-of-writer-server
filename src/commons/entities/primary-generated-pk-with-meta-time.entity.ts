import { Generated, PrimaryColumn } from 'typeorm';
import { BaseMetaTimeStampEntity } from './base-meta-timestamp.entity';
import { BigintValueTransformer } from './transformer/bigint-value.transformer';

import { IdNotMatchException } from './exception/id-not-match.exception';
import { AutoMap } from '@automapper/classes';

export abstract class PrimaryGeneratedPkWithMetaTimeEntity extends BaseMetaTimeStampEntity {
  @AutoMap()
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
