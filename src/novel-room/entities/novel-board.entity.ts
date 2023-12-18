import { Column, Entity } from 'typeorm';
import { PrimaryAuditiedPK } from '../../commons/entities/primary-auditied-pk.entity';

@Entity({ name: 'novel-room', schema: 'gow-server' })
export class NovelRoomEntity extends PrimaryAuditiedPK {
  @Column({ length: 255, unique: true })
  type: string;

  @Column({ length: 255, unique: true })
  title: string;

  @Column('varchar', { length: 255, unique: true })
  subTitle: string;

  @Column('varchar', { length: 255 })
  category: string;

  @Column('varchar', { length: 255 })
  charactor: number;

  @Column('varchar', { length: 255 })
  surmmary: number;
}
