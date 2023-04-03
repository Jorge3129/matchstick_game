import { Injectable } from '@nestjs/common';

import { Puzzle } from '../model/puzzle.schema';
import { Equation } from '../model/equation.interface';
import { MatchMove } from '../model/match-move.interface';

import { SwiplService } from 'src/swipl/swipl.service';
import { SwiplList } from 'src/swipl/swipl-list.interface';
import { listToArray as toArray } from 'src/swipl/swipl-utils';

interface PuzzleQueryResult {
  Puzzle: SwiplList;
  Solution: SwiplList;
  Moves: SwiplList<SwiplList>;
}

function formatEquation([term1, operator, term2, result]: any[]): Equation {
  return { term1, operator, term2, result };
}

function formatMove([index, match]: number[]): MatchMove {
  const action = match === 1 ? 'remove' : 'add';

  return { index, action };
}

@Injectable()
export class PuzzleGeneratorService {
  constructor(private readonly swiplService: SwiplService) {}

  public generatePuzzles(): Puzzle[] {
    const query = `solution_not_equal(Puzzle, Solution, Moves)`;

    return this.swiplService
      .queryMany<PuzzleQueryResult>('game.pl', query)
      .map((result): Puzzle => {
        return {
          puzzle: formatEquation(toArray(result.Puzzle)),
          solution: formatEquation(toArray(result.Solution)),
          moves: toArray(result.Moves).map((move) => formatMove(toArray(move))),
        };
      });
  }
}
