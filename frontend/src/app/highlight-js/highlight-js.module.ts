import { NgModule } from '@angular/core';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

@NgModule({
  imports: [HighlightModule],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          prolog: () => import('highlight.js/lib/languages/prolog'),
        },
      },
    },
  ],
  exports: [HighlightModule],
})
export class HighlightJsModule {}
