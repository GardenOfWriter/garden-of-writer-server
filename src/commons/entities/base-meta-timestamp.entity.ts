import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseMetaTimeStampEntity extends BaseEntity {
  @CreateDateColumn({ type: 'timestamp', comment: '생성시간 ' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정시간' })
  updatedAt: Date;
}
