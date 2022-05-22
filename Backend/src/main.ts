import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(resolve('./src/utils'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('hbs');
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
