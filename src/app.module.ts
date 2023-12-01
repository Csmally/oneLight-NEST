import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { dbConfig } from 'sysConfigs';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionInterceptor } from 'src/common/interceptors/globalExceptionInterceptor';
import { GlobalResponseInterceptor } from 'src/common/interceptors/globalResponseInterceptor';
import { TestModule } from './test/test.module';
import { TestGuard } from './common/guards/testGuard';

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
    //错误处理
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionInterceptor,
    },
    //返回处理
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalResponseInterceptor,
    },
    //测试
    {
      provide: APP_GUARD,
      useClass: TestGuard
    },
  ],
})
export class AppModule {}
