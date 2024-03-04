import { Column, Entity, OneToMany } from 'typeorm';
import { PrimaryGeneratedPkEntity } from '../../commons/entities/primary-generated-pk.entity';
import { NovelTagEntity } from './novel-tag.entity';

@Entity({ name: 'tag', schema: 'gow-server' })
export class TagEntity extends PrimaryGeneratedPkEntity {
  @Column('varchar', { length: 255 })
  name: string;

  @OneToMany((type) => NovelTagEntity, (novelTag) => novelTag.tag)
  noveTag: NovelTagEntity[];

  static of(name: string) {
    const tag = new TagEntity();
    tag.name = name;
    return tag;
  }
}
