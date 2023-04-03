import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PuzzleModule } from './puzzle/puzzle.module';
import { SwiplModule } from './swipl/swipl.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:examplepass@mongodb:27017'),
    PuzzleModule,
    SwiplModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
