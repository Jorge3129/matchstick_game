import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EquationDisplayComponent } from './components/equation-display/equation-display.component';
import { MatchstickDirective } from './components/matchstick.directive';
import { GamePageComponent } from './components/game-page/game-page.component';
import { CodePageComponent } from './components/code-page/code-page.component';
import { HighlightJsModule } from './highlight-js/highlight-js.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    EquationDisplayComponent,
    MatchstickDirective,
    GamePageComponent,
    CodePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HighlightJsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
