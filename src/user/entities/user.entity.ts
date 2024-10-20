import { ChapterLikeEntity } from '@app/chapter/entities/chapter-like.entity';
import { PASSWORD_REG_EXP, PASSWORD_REG_EXP_ERROR_MESSAGE } from '@app/commons/reg-exp/reg-exp';
import { BoardLikeEntity } from '@app/novel-attend-board/entities/board-like.entity';
import { NovelRoomEntity } from '@app/novel-room/entities/novel-room.entity';
import { AutoMap } from '@automapper/classes';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @AutoMap()
  @PrimaryGeneratedColumn({
    name: 'user_id',
  })
  id: number;

  @AutoMap()
  @Column({ length: 255, unique: true })
  email: string;

  @AutoMap()
  @Column({ length: 255, unique: true })
  nickname: string;

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

  @OneToMany(() => BoardLikeEntity, (boardLike) => boardLike.user)
  boardLike: BoardLikeEntity[];

  @OneToMany(() => ChapterLikeEntity, (chapterLike) => chapterLike.user)
  chapterLike: ChapterLikeEntity[];

  static of(email: string, nickname: string, password: string) {
    const user = new UserEntity();
    user.email = email;
    user.nickname = nickname;
    user.password = password;
    return user;
  }
  checkRegexPassword() {
    if (PASSWORD_REG_EXP.test(this.password) === false) {
      throw new BadRequestException(PASSWORD_REG_EXP_ERROR_MESSAGE);
    }
  }
}
