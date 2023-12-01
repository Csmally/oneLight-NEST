/**
 * 强校验守卫
 * 防止抓包，模拟请求
 */

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as CryptoJS from 'crypto-js';
import { secretKey } from 'sysConfigs';

@Injectable()
export class PowerAuthorityGuard implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext): boolean {
    if (process.env.NODE_ENV === 'development') return true;
    const request: Request = context.switchToHttp().getRequest();
    const token: string = request.headers['power-authorization'] as string;
    if (!token) throw new UnauthorizedException();
    const decryptToken = CryptoJS.AES.decrypt(token, secretKey).toString(CryptoJS.enc.Utf8);
    const stamp = Number(decryptToken);
    const stampDiff = Date.now() - stamp;
    if (stampDiff >= 0 && stampDiff < 25000) return true;
    throw new UnauthorizedException();
  }
}
