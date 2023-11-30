import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { JwtService } from 'src/common/services/jwtService';

@Module({
  controllers: [TestController],
  providers: [TestService,JwtService],
})
export class TestModule {}
