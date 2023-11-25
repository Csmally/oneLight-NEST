import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('signIn')
  login(
    @Body('mobile') mobile: string,
    @Body('msgCode') msgCode: string,
    @Body('secret') secret: string,
  ) {
    return this.loginService.login(mobile, msgCode, secret);
  }

  @Get('msgCode')
  getMsgCode(@Query('mobile') mobile: string, @Query('secret') secret: string) {
    return this.loginService.getMsgCode(mobile, secret);
  }
}
