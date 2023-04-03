import { Injectable } from '@nestjs/common';
import { Puzzle } from '../model/puzzle.schema';
import { PuzzleRepository } from './puzzle-repository';
import { PuzzleGeneratorService } from './puzzle-generator.service';

@Injectable()
export class PuzzleService {
  constructor(
    private readonly repo: PuzzleRepository,
    private readonly generator: PuzzleGeneratorService,
  ) {}

  public async findAllOrGenerate(): Promise<Puzzle[]> {
    const puzzles = await this.repo.findAll();

    if (!puzzles.length) {
      return this.repo.saveMany(this.generator.generatePuzzles());
    }

    return puzzles;
  }
}
