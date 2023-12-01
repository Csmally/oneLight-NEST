import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as CryptoJS from 'crypto-js';
import { secretKey } from 'sysConfigs';
import { JwtService } from 'src/common/services/jwtService';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(mobile: string, msgCode: string) {
    let isCodeRight: boolean;
    if (process.env.NODE_ENV === 'development') {
      isCodeRight = msgCode === '0116';
    } else {
      // 生产环境需要先校验手机号码和验证码是否匹配（后续接入腾讯短信服务返回isCodeRight，）
      isCodeRight = false;
    }
    if (isCodeRight) {
      const user = await this.addOrFindUser(mobile);
      const Authorization = this.jwtService.generateToken({
        id: user.id,
        uid: user.uid,
      });
      const res = { ...user, Authorization, isCodeRight };
      return res;
    } else {
      return { message: '验证码错误', isCodeRight };
    }
  }

  async addOrFindUser(mobile: string) {
    const user = await this.userService.findOne({ mobile });
    if (user) return user;
    const newUser = await this.userService.create(mobile);
    return newUser;
  }

  getMsgCode(mobile: string) {
    if (process.env.NODE_ENV === 'development') return { message: '发送成功' }; 
    // 发起短信发送服务（后续接入腾讯短信服务）
    const res = true;
    if (res) return { message: '发送成功' };
    return { message: '发送失败' }
  }
}
