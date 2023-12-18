import { Column, Entity } from 'typeorm';
import { PrimaryAuditiedPK } from '../../commons/entities/primary-auditied-pk.entity';

import {
  ChapterStatusEnum,
  ChapterStatusType,
} from './enum/chapter-status.enum';
@Entity({ name: 'chapter', schema: 'gow-server' })
export class ChapterEntity extends PrimaryAuditiedPK {
  @Column({ length: 255, unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: Object.values(ChapterStatusEnum),
    default: ChapterStatusEnum.WRITING,
  })
  status: ChapterStatusType;
}
