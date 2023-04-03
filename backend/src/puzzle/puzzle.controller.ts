import { Controller, Get } from '@nestjs/common';
import { PuzzleService } from './service/puzzle.service';

@Controller('puzzles')
export class PuzzleController {
  constructor(private service: PuzzleService) {}

  @Get()
  public async getAllPuzzles() {
    return this.service.findAllOrGenerate();
  }
}
