import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core.module';
import { NestApplicationOptions } from '@nestjs/common';
import * as fs from 'fs';
import 'dotenv/config';

async function bootstrap() {
  const options: NestApplicationOptions = { abortOnError: false };
  if (process.env.HTTPS === 'true') {
    options.httpsOptions = {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    };
  }

  const app = await NestFactory.create(CoreModule, { ...options });
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(5000);
}
bootstrap();
