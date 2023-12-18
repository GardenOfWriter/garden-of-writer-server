import { Column, Entity } from 'typeorm';
import { PrimaryAuditiedPK } from '../../commons/entities/primary-auditied-pk.entity';

@Entity({ name: 'novel-writer', schema: 'gow-server' })
export class NovelWriterEntity extends PrimaryAuditiedPK {
  @Column('bigint')
  novelRoomId: number;

  @Column('bigint')
  userId: number;

  @Column('int')
  priority: number;

  @Column('varchar', { length: 50 })
  status: string;
}
