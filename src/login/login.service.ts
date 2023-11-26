import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as CryptoJS from 'crypto-js';
import { secretKey } from 'sysConfigs';

@Injectable()
export class LoginService {
  constructor(private readonly userService: UserService) {}

  async login(mobile: string, msgCode: string, secret: string) {
    const unSecretMobile = CryptoJS.AES.decrypt(secret, secretKey).toString(
      CryptoJS.enc.Utf8,
    );
    if (mobile === unSecretMobile) {
      if (process.env.NODE_ENV === 'development') {
        if (msgCode === '1234') {
          this.addOrFindUser(mobile);
        } else {
          return { message: '验证码错误' };
        }
      } else {
        // 生产环境需要先校验手机号码和验证码是否匹配（后续接入腾讯短信服务返回isCodeRight，）
        const isCodeRight = true;
        if (isCodeRight) {
          this.addOrFindUser(mobile);
        } else {
          return { message: '验证码错误' };
        }
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  async addOrFindUser(mobile: string) {
    const user = await this.userService.findOne({ mobile });
    if (user) {
      return user;
    } else {
      const newUser = await this.userService.create(mobile);
      return newUser;
    }
  }

  getMsgCode(mobile: string, secret: string) {
    const unSecretMobile = CryptoJS.AES.decrypt(secret, secretKey).toString(
      CryptoJS.enc.Utf8,
    );
    if (mobile === unSecretMobile) {
      // 发起短信发送服务（后续接入腾讯短信服务）
      return { message: '发送成功' };
    } else {
      throw new UnauthorizedException();
    }
  }
}
