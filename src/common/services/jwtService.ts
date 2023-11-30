// jwt.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { secretKey } from 'sysConfigs';

@Injectable()
export class JwtService {
  generateToken(payload: any): string {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // 设置过期时间
  }

  verifyToken(token: string): any {
    try {
      jwt.verify(token, secretKey);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
