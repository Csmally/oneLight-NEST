import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { PowerAuthorityGuard } from 'src/common/guards/powerAuthorityGuard';

@Controller('login')
@UseGuards(PowerAuthorityGuard)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('signIn')
  login(@Body('mobile') mobile: string, @Body('msgCode') msgCode: string) {
    return this.loginService.login(mobile, msgCode);
  }

  @Get('msgCode')
  getMsgCode(@Query('mobile') mobile: string) {
    return this.loginService.getMsgCode(mobile);
  }
}
