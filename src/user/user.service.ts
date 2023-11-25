import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  create(mobile: string) {
    console.log('9898环境', process.env.NODE_ENV);
    const data = new User();
    data.mobile = mobile;
    return this.user.save(data);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(params) {
    const user = await this.user.findOne({ where: params });
    return user;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
