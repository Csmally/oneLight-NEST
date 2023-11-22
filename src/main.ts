import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFormat } from './common/responseFormat';
import { ErrorFilter } from './common/errorFilter';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('localhost-key.pem'),
    cert: fs.readFileSync('localhost.pem'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new ResponseFormat());
  await app.listen(3000);
}
bootstrap();
