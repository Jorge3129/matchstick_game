import { ChangeDetectionStrategy, Component } from '@angular/core';
import { routes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  public routes = routes;
}
