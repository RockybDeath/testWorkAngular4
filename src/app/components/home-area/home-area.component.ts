import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-area',
  templateUrl: './home-area.component.html',
  styleUrls: ['./home-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeAreaComponent {
  constructor(private router: Router) {}

  public register(): void {
    this.router.navigateByUrl('/login');
  }
}
