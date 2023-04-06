import { BehaviorSubject } from 'rxjs';
import { Puzzle } from '../models/puzzle.schema';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PuzzleStore {
  public readonly puzzles$ = new BehaviorSubject<Puzzle[]>([]);
}
