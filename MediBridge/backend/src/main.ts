import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    exceptionFactory: (errors) => {
      const messages = errors.map(error => 
        Object.values(error.constraints || {}).join(', ')
      );
      return new Error(messages.join('; ') || 'Validation failed');
    },
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 MediBridge Backend running on http://localhost:${port}`);
}

bootstrap();

