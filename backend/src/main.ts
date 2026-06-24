import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Prefix every route with /api for a clean separation from the frontend.
  app.setGlobalPrefix('api');

  // Strip unknown properties and auto-transform payloads into DTO instances.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Allow the frontend (configurable) to call the API.
  const corsOrigin =
    config.get<string>('CORS_ORIGIN') ?? 'http://localhost:3000';
  app.enableCors({
    origin: corsOrigin.split(',').map((origin) => origin.trim()),
    credentials: true,
  });

  // Bind to 0.0.0.0 so cloud hosts (Render, etc.) can route to the app.
  const port = config.get<number>('PORT') ?? 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚆 API is running on port ${port} (prefix /api)`);
}
void bootstrap();
