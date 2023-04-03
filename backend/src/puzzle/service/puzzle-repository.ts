import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Puzzle, PuzzleDocument } from '../model/puzzle.schema';

@Injectable()
export class PuzzleRepository {
  constructor(
    @InjectModel(Puzzle.name)
    private readonly puzzleModel: Model<PuzzleDocument>,
  ) {}

  public async saveMany(puzzles: Puzzle[]): Promise<Puzzle[]> {
    return this.puzzleModel.insertMany(puzzles);
  }

  public async findAll(): Promise<Puzzle[]> {
    return this.puzzleModel.find().exec();
  }
}
