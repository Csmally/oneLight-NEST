// jwt.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { httpsSecretKey } from 'sysConfigs';

@Injectable()
export class JwtService {
  generateToken(payload: any): string {
    return jwt.sign(payload, httpsSecretKey, { expiresIn: '1h' }); // 设置过期时间
  }

  verifyToken(token: string): any {
    try {
      jwt.verify(token, httpsSecretKey);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
