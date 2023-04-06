import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { digits } from '../../constants/digits';
import { Equation } from '../../models/equation.interface';
import { Maybe } from 'purify-ts';
import { MatchstickDirective } from '../matchstick.directive';
import { Puzzle } from '../../models/puzzle.schema';
import { range } from 'lodash';
import { MatchMove } from '../../models/match-move.interface';
import { Pictures } from '../../constants/pictures';
import { Observable, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/components/base-component';

@Component({
  selector: 'app-equation-display',
  templateUrl: './equation-display.component.html',
  styleUrls: ['./equation-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquationDisplayComponent extends BaseComponent implements OnInit {
  @Input()
  public puzzle?: Puzzle;

  @Input()
  public showSolution$!: Observable<void>;

  @ViewChildren(MatchstickDirective, { read: ElementRef })
  public itemList!: QueryList<ElementRef<HTMLSpanElement>>;

  public pictures = Pictures;

  public matchStickPositions: { id: number }[] = [];
  public equalsMatchsticks = [24, 25];

  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.showSolution$.pipe(takeUntil(this.dispose$)).subscribe(() => {
      this.showSolution();
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['puzzle'] && this.puzzle) {
      this.matchStickPositions = this.getMatchsticks(this.puzzle.puzzle);
    }
  }

  public showSolution() {
    if (!this.puzzle) {
      return;
    }

    const { remove, move } = this.calcMoves(this.puzzle?.moves);

    this.moveMatch(move.start, move.dest);
    this.removeMatch(remove);
  }

  private moveMatch(id: number, dest: number) {
    this.findMatch(id).ifJust((el) => {
      this.animate(el);
      el.classList.remove(`item-${id}`);
      el.classList.add('item-' + dest);
    });
  }

  private removeMatch(id: number) {
    this.findMatch(id).ifJust((el) => {
      this.animate(el);

      el.classList.remove(`item-${id}`);
      el.classList.add('removed');
    });
  }

  private animate(el: HTMLElement, ms = 700) {
    el.classList.add('animate');
    el.classList.add('forward');
    setTimeout(() => {
      el.classList.remove('animate');
    }, ms);
  }

  private findMatch(id: number) {
    const targetItem = this.itemList.find(
      (item) => item.nativeElement.id === `${id}`
    );

    return Maybe.fromNullable(targetItem).map((item) => item.nativeElement);
  }

  public calcMoves(moves: MatchMove[]) {
    const [add] = moves.filter(({ action }) => action === 'add');
    const [remove1, remove2] = moves.filter(
      ({ action }) => action === 'remove'
    );

    return {
      move: {
        start: remove1.index,
        dest: add.index,
      },
      remove: remove2.index,
    };
  }

  public getMatchsticks(equation: Equation) {
    const { term1, term2, result, operator } = equation;

    const indices = [term1, operator, term2, result].flatMap(
      (ch) => digits[ch]
    );

    return range(1, 24)
      .map((id) => ({ id }))
      .filter((_, i) => indices[i]);
  }
}
