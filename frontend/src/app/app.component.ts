import { Component, OnInit } from '@angular/core';
import { PuzzleApiService } from './shared/services/puzzle-api.service';
import { PuzzleStore } from './store/puzzles.store';
import { Puzzle } from './puzzle/models/puzzle.schema';
import { random } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public puzzle?: Puzzle;

  public showSolution = false;

  public get puzzles() {
    return this.puzzleStore.puzzles$.value;
  }

  constructor(
    private readonly puzzleApi: PuzzleApiService,
    private readonly puzzleStore: PuzzleStore
  ) {}

  public async ngOnInit(): Promise<void> {
    await this.puzzleApi.loadPuzzlesToStore();
  }

  public loadNextPuzzle() {
    const index = random(0, this.puzzles.length - 1);

    this.showSolution = false;
    this.puzzle = this.puzzles[index];
  }
}
