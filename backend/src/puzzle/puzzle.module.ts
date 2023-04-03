import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PuzzleService } from './service/puzzle.service';
import { PuzzleController } from './puzzle.controller';
import { Puzzle, PuzzleSchema } from './model/puzzle.schema';
import { PuzzleGeneratorService } from './service/puzzle-generator.service';
import { PuzzleRepository } from './service/puzzle-repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Puzzle.name, schema: PuzzleSchema }]),
  ],
  providers: [PuzzleService, PuzzleGeneratorService, PuzzleRepository],
  controllers: [PuzzleController],
})
export class PuzzleModule {}
