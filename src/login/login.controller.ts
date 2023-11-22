import { Controller, Get, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body('mobile') mobile: string) {
    return this.loginService.login(mobile);
  }

  @Get('msgCode')
  getMsgCode() {
    return this.loginService.getMsgCode();
  }
}
