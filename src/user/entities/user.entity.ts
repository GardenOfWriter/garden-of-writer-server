import {
  PASSWORD_REG_EXP,
  PASSWORD_REG_EXP_ERROR_MESSAGE,
} from '@app/commons/reg-exp/reg-exp';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
export class UserEntity {
  @PrimaryGeneratedColumn({
    name: 'user_id',
  })
  id: number;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255, unique: true })
  nickname: string;

  @Column({ length: 255 })
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

  checkRegexPassword() {
    if (PASSWORD_REG_EXP.test(this.password) === false) {
      throw new BadRequestException(PASSWORD_REG_EXP_ERROR_MESSAGE);
    }
  }

  static of(email: string, nickname: string, password: string) {
    const user = new UserEntity();
    user.email = email;
    user.nickname = nickname;
    user.password = password;
    return user;
  }
}
