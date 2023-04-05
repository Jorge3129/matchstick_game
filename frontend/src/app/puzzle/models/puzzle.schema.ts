import { Equation } from './equation.interface';
import { MatchMove } from './match-move.interface';

export class Puzzle {
  _id!: string;

  puzzle!: Equation;

  solution!: Equation;

  moves!: MatchMove[];
}
