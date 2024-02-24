import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api', {
    exclude: [
      'static',
      'static/:location',
      'static/:location/:name'
    ]
  });
  await app.listen(5000);
}
bootstrap();

