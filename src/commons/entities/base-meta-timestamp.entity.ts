import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { convertDayFormat } from '../util/date.util';
import { AutoMap } from '@automapper/classes';

export abstract class BaseMetaTimeStampEntity {
  @AutoMap()
  @CreateDateColumn({
    type: 'timestamp',
    comment: '생성시간 ',
    transformer: {
      to: (value) => value,
      from: (value) => convertDayFormat(value),
    },
  })
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn({
    type: 'timestamp',
    comment: '수정시간',
    transformer: {
      to: (value) => value,
      from: (value) => convertDayFormat(value),
    },
  })
  updatedAt: Date;
}
