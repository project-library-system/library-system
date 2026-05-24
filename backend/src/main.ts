import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.enableCors({
    origin: 'http://localhost:3000', //Rota do front que vai acessar a API
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', //Métodos HTTP que serão aceitos
    credentials: true, //permite cookies e headers personalizados
    allowedHeaders: [
      'Content-Type',
      'Authorization', //Autorização para autenticação
    ],
  });

  await app.listen(8000, '0.0.0.0');
}
bootstrap();
