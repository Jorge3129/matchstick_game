import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Puzzle } from 'src/app/models/puzzle.schema';
import { PuzzleStore } from 'src/app/store/puzzles.store';
import { environment } from 'src/environment/environment';

type Predicate<T> = (item: T) => boolean;

const combinePredicates = <T>(...predicates: Predicate<T>[]): Predicate<T> => {
  return (item) => predicates.every((predicate) => predicate(item));
};

@Injectable({
  providedIn: 'root',
})
export class PuzzleApiService {
  constructor(
    private readonly httpService: HttpClient,
    private readonly puzzlesStore: PuzzleStore
  ) {}

  public async loadPuzzlesToStore(): Promise<Puzzle[]> {
    const result = await firstValueFrom(
      this.httpService.get<Puzzle[]>(`${environment.apiUrl}/puzzles`)
    );

    const filter = ({ solution, puzzle }: Puzzle) =>
      solution.term1 !== 0 &&
      solution.term2 !== 0 &&
      solution.result !== 0 &&
      puzzle.term1 !== 0 &&
      puzzle.term2 !== 0 &&
      puzzle.result !== 0;

    const hasDifferentOperators = ({ solution, puzzle }: Puzzle) =>
      solution.operator !== puzzle.operator;

    const puzzles = result.filter(combinePredicates(hasDifferentOperators));

    this.puzzlesStore.puzzles$.next(puzzles);

    return puzzles;
  }
}
