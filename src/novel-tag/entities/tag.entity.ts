import { Column, Entity, Index } from 'typeorm';
import { PrimaryGeneratedPkEntity } from '../../commons/entities/primary-generated-pk.entity';

@Entity({ name: 'tag', schema: 'gow-server' })
export class TagEntity extends PrimaryGeneratedPkEntity {
  @Column('varchar', { length: 255 })
  name: string;
}
