import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFormat } from './common/responseFormat';
import { ErrorFilter } from './common/errorFilter';
import { TokenInterceptor } from './common/tokenInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new ResponseFormat());
  app.useGlobalInterceptors(new TokenInterceptor());
  await app.listen(3000);
}
bootstrap();
