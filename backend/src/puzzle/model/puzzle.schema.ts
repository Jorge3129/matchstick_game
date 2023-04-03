import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Equation } from './equation.interface';
import { MatchMove } from './match-move.interface';

export type PuzzleDocument = Puzzle & Document;

@Schema()
export class Puzzle {
  @Prop()
  puzzle!: Equation;

  @Prop()
  solution!: Equation;

  @Prop([{ type: Object }])
  moves!: MatchMove[];
}

export const PuzzleSchema = SchemaFactory.createForClass(Puzzle);
