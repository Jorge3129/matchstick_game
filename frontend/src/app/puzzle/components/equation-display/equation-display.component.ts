import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { Coords } from 'src/app/shared/types/coords';
import { addOffsetX } from 'src/app/shared/utils/offset-utils';
import { digits } from '../../constants/digits';
import { Equation } from '../../models/equation.interface';
import { Maybe } from 'purify-ts';
import { MatchstickDirective } from '../matchstick.directive';
import {
  equalsDisplay,
  sevenSegmentDisplay,
  operatorDisplay,
} from './render-digits';
import { Puzzle } from '../../models/puzzle.schema';
import { range } from 'lodash';
import { MatchMove } from '../../models/match-move.interface';

@Component({
  selector: 'app-equation-display',
  templateUrl: './equation-display.component.html',
  styleUrls: ['./equation-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquationDisplayComponent implements OnInit {
  @Input()
  public puzzle?: Puzzle;

  @ViewChildren(MatchstickDirective, { read: ElementRef })
  public itemList!: QueryList<ElementRef<HTMLSpanElement>>;

  private CELL_WIDTH = 50;
  private MATCH_WIDTH = 4;
  private MATCH_LENGTH = 46;

  public placeholderPositions = this.getPlaceholderPositions();
  public matchStickPositions: ReturnType<
    typeof this.getMovableMatchstickPositions
  > = [];

  constructor(private renderer: Renderer2) {}

  public ngOnInit(): void {}

  public showSolution() {
    if (!this.puzzle) {
      return;
    }

    const { remove, move } = this.calcMoves(this.puzzle?.moves);

    this.moveMatch(move.start, move.dest);
    this.removeMatch(remove);
  }

  private moveMatch(start: number, dest: number) {
    this.findMatch(start).ifJust((el) => {
      el.style.transition = '0.6s all ease-in-out';
      el.classList.remove('item-' + el.id);
      el.classList.add('item-' + dest);
    });
  }

  private removeMatch(start: number) {
    this.findMatch(start).ifJust((el) => {
      el.style.transition = '0.6s all ease-in-out';
      el.classList.remove('item-' + el.id);
      el.classList.add('removed');
    });
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

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['puzzle'] && this.puzzle) {
      this.matchStickPositions = this.getMovableMatchstickPositions(
        this.puzzle.puzzle
      );
    }
  }

  public getMovableMatchstickPositions(equation: Equation) {
    const { term1, term2, result, operator } = equation;

    const indices = [term1, operator, term2, result].flatMap(
      (ch) => digits[ch]
    );

    return range(1, 24)
      .map((id) => ({ id }))
      .filter((_, i) => indices[i]);
  }

  public getEqualsMatchSticks() {
    return this.mapToPositions(equalsDisplay.map(addOffsetX(4.5)));
  }

  public getPlaceholderPositions() {
    return this.mapToPositions(this.getMovableSticks());
  }

  public mapToPositions(sticks: Coords[]) {
    return sticks.map(([x1, y1, x2]) => {
      const rotation = x1 === x2 ? 'vert' : 'hor';

      const { offsetX, offsetY } = this.getOffsets(
        this.MATCH_WIDTH / 2,
        rotation
      );

      return {
        horizontal: rotation === 'hor',
        left: x1 * this.CELL_WIDTH + offsetX,
        top: y1 * this.CELL_WIDTH + offsetY,
        width: this.MATCH_WIDTH,
        height: this.MATCH_LENGTH,
      };
    });
  }

  public getOffsets(offset: number, rotation: 'vert' | 'hor') {
    if (rotation === 'hor') {
      return {
        offsetX: offset,
        offsetY: -1 * offset,
      };
    }

    return {
      offsetX: -1 * offset,
      offsetY: offset,
    };
  }

  public getMovableSticks(): Coords[] {
    return [0, 3, 6]
      .flatMap((offsetX) => sevenSegmentDisplay.map(addOffsetX(offsetX)))
      .concat(this.getPositionedSign());
  }

  public getPositionedSign(): Coords[] {
    return operatorDisplay.map(addOffsetX(1.5));
  }
}
