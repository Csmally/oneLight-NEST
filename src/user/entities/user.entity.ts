import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BeforeInsert,
} from 'typeorm';
import randomInfo from 'src/utils/randomInfo';
import { nanoid } from 'nanoid';

enum UserSex {
  BOY = 1,
  GIRL = 2,
  UNKNOWN = 3,
}

@Entity()
@Unique(['mobile'])
@Unique(['idCard'])
@Unique(['uid'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @BeforeInsert()
  generateName() {
    // 在插入数据之前生成新的 name 属性
    this.name = randomInfo();
  }

  @Column({
    type: 'enum',
    enum: UserSex,
    default: UserSex.UNKNOWN,
  })
  sex: number;

  @Column()
  mobile: string;

  @Column({
    default: 'https://tuchuangs.com/imgs/2023/09/24/767f8f6dc8ca04e4.jpg',
  })
  avator: string;

  @Column({ nullable: true })
  idCard: string;

  @Column({ nullable: true })
  Campus: number;

  @Column()
  uid: string;

  @BeforeInsert()
  generateUid() {
    // 在插入数据之前生成新的 UUID 并赋值给 uid
    this.uid = nanoid();
  }

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateTime: Date;
}
