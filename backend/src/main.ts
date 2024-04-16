import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core.module';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(5000);
}
bootstrap();
