import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [ConfigModule, TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
