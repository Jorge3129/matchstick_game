import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnDestroy {
  protected dispose$ = new Subject<void>();

  public ngOnDestroy(): void {
    this.dispose$.next();
    this.dispose$.complete();
  }
}
