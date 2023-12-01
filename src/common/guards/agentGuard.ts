/**
 * 访问来源守卫
 */

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AgentGuard implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext): boolean {
    if (process.env.NODE_ENV === 'development') return true;
    const request: Request = context.switchToHttp().getRequest();
    const agentType = request.headers['ol-agent-type'];
    const isFromSafe = agentType.includes('oneLight');
    if (isFromSafe) return true;
    throw new UnauthorizedException();
  }
}
