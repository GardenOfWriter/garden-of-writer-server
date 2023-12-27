import * as bcrypt from 'bcrypt';
import { NovelRoomEntity } from 'src/novel-room/entities/novel-room.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user', schema: 'gow-server' })
export class userEntity {
  @PrimaryGeneratedColumn({
    name: 'user_id',
  })
  id: number;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255, unique: true })
  nickname: string;
  /**
   *  패스워드를 조회할 필요는 없어보임
   */
  @Column({ length: 255, select: false })
  password: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  //비밀번호 암호화
  @BeforeInsert()
  private beforeInsert() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @OneToMany(() => NovelRoomEntity, (novelRoom) => novelRoom.user)
  novelRooms: NovelRoomEntity[];
}
