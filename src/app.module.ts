import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { dbConfig } from 'sysConfigs';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/globalExceptionFilter';
import { GlobalResponseInterceptor } from './common/globalResponseInterceptor';
import { AuthorityGuard } from './common/authorityGuard';
import { TestModule } from './test/test.module';
import { JwtService } from './common/jwtService';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    LoginModule,
    UserModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    //错误处理
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    //返回处理
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalResponseInterceptor,
    },
    //访问权限处理
    {
      provide: APP_GUARD,
      useClass: AuthorityGuard,
    },
  ],
})
export class AppModule {}
