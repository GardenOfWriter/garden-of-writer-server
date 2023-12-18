import { Column, Entity } from 'typeorm';
import { PrimaryAuditiedPK } from '../../commons/entities/primary-auditied-pk.entity';

@Entity({ name: 'novel-tag', schema: 'gow-server' })
export class NovelTagEntity extends PrimaryAuditiedPK {
  @Column('bigint')
  novelRoomId: number;
}
