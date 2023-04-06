import { ChangeDetectionStrategy, Component } from '@angular/core';
import { random } from 'lodash';
import { Subject } from 'rxjs';
import { Pictures } from 'src/app/constants/pictures';
import { Puzzle } from 'src/app/models/puzzle.schema';
import { PuzzleApiService } from 'src/app/services/puzzle-api.service';
import { PuzzleStore } from 'src/app/store/puzzles.store';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class GamePageComponent {
  public puzzle?: Puzzle;
  public pictures = Pictures;
  public isShownSolution = false;
  public showSolution$ = new Subject<void>();

  public get puzzles() {
    return this.puzzleStore.puzzles$.value;
  }

  constructor(
    private readonly puzzleApi: PuzzleApiService,
    private readonly puzzleStore: PuzzleStore
  ) {}

  public async ngOnInit(): Promise<void> {
    await this.puzzleApi.loadPuzzlesToStore();

    this.loadNextPuzzle();
  }

  public loadNextPuzzle() {
    const index = random(0, this.puzzles.length - 1);

    this.puzzle = this.puzzles[index];
    this.isShownSolution = false;
  }

  public showSolution() {
    this.showSolution$.next();
    this.isShownSolution = true;
  }
}
