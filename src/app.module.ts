import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PipesController } from './pipes/pipes.controller';
import { ValidationPipeForClass } from './pipes/ValidationPipeForClass';

@Module({
  imports: [],
  controllers: [AppController, PipesController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipeForClass,
    },
  ],
})
export class AppModule {}
