import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserModule } from 'src/user/user.module';
import { JwtService } from 'src/common/jwtService';

@Module({
  imports: [UserModule],
  controllers: [LoginController],
  providers: [LoginService, JwtService],
})
export class LoginModule {}
