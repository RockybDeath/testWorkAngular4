import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return this.canAccess();
  }

  canActivateChild(): Promise<boolean> {
    return this.canAccess();
  }

  private canAccess(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const user = this.userService.getCurrentUser();
      if (user?.token) {
        resolve(true);
      } else {
        this.router.navigateByUrl('/login');
        resolve(false);
      }
    });
  }
}
