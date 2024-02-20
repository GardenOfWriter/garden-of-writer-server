import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { PrimaryAuditiedPK } from '../../commons/entities/primary-auditied-pk.entity';

@Entity({ name: 'novel-tag', schema: 'gow-server' })
export class NovelTagEntity extends PrimaryAuditiedPK {
  @Column('bigint')
  novelRoomId: number;

  @Column('varchar', { length: 6 })
  tagName: string;

  @ManyToMany(() => NovelRoomEntity)
  novelRoom: NovelRoomEntity[];
}
