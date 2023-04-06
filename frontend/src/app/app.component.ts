import { Component, OnInit } from '@angular/core';
import { Pictures } from './constants/pictures';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public pictures = Pictures;

  ngOnInit(): void {}
}
