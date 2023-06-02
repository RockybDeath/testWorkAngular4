import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  public title = 'Angular test work';
  public isAuthenticated$: Observable<boolean>;

  public constructor(private userService: UserService) {
    this.isAuthenticated$ = this.userService.isAuthenticated$;
  }

  public logout(): void {
    this.userService.logout();
  }
}
