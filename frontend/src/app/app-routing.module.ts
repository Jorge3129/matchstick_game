import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './components/game-page/game-page.component';
import { CodePageComponent } from './components/code-page/code-page.component';

export const routes: Routes = [
  {
    path: 'game',
    title: 'Game',
    component: GamePageComponent,
  },
  {
    path: 'code',
    title: 'Code',
    component: CodePageComponent,
  },
  {
    path: '**',
    redirectTo: 'game',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
