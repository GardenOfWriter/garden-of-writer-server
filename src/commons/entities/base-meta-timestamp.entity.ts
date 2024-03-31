import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { convertDayFormat } from '../util/date.util';

export abstract class BaseMetaTimeStampEntity {
  @CreateDateColumn({
    type: 'timestamp',
    comment: '생성시간 ',
    transformer: {
      to: (value) => value,
      from: (value) => convertDayFormat(value),
    },
  })
  createdAt: Date;

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
