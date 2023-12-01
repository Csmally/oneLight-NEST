/**
 * 访问来源守卫
 */

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class TestGuard implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const userAgent = request.headers['user-agent'];
    const isFromSafe = userAgent.includes('oneLight');
    if (isFromSafe) return true;
    throw new UnauthorizedException();
  }
}
