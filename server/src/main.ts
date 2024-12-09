import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from '@config/cors-options.config';
import { Logger, ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
  Logger.log(`Server started on port = ${PORT}`);
}
bootstrap();
