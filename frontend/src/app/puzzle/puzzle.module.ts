import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquationDisplayComponent } from './components/equation-display/equation-display.component';
import { MatchstickDirective } from './components/matchstick.directive';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [EquationDisplayComponent, MatchstickDirective],
  imports: [CommonModule, MaterialModule],
  exports: [EquationDisplayComponent],
})
export class PuzzleModule {}
