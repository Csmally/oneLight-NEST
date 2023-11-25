import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { dbConfig } from 'sysConfigs';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), LoginModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
