// 1. 创建守卫类
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from './jwtService';

@Injectable()
export class AuthorityGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    if (request.path === '/login/signIn' || request.path === '/login/msgCode') {
      return true;
    }
    const token = request.headers.authorization;
    if (!token) throw new UnauthorizedException();
    this.jwtService.verifyToken(token);
    return true;
  }
}
