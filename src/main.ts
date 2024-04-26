import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  const version = 'v1';
  const globalPrefix = `/api/${version}`;

  app.setGlobalPrefix(globalPrefix);

  const env = configService.get('NODE_ENV', 'development');
  const port = configService.get('PORT', 3000);

  if (env === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Backend - Neversitup - Testing')
      .setDescription('- By Pakpoom Somroop')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, document);
  }

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`with ${env} environment`);
  console.log(`docs ${await app.getUrl()}${globalPrefix}/docs`);
}
bootstrap();
