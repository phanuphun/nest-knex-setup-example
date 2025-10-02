import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { KnexService } from './databases/knex/knex.service';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
    }),
  });
  const knexService = app.get(KnexService);
  const apiPrefix = '/api/v1'
  const swaggerPath = '/api-docs'
  app.setGlobalPrefix(apiPrefix);

  const config = new DocumentBuilder()
    .setTitle('BYOD API')
    .setDescription('no description yet.')
    .setVersion('1.0')
    .addTag('WATER METER')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, documentFactory);
  console.log(`===================================================`)
  console.log(`API Prefix: ${apiPrefix}`);
  console.log(`API Document (swagger): ${swaggerPath}`);
  console.log(`Database Connection Status: ${await knexService.checkConnection()}`);
  console.log(`Server running on port: ${process.env.PORT ?? 3000}`);
  console.log(`===================================================`)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
