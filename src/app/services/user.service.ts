import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class UserService implements OnDestroy {
  private currentUser?: User;
  private users: User[] = [];
  private _isAuthenticated$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated$.asObservable();
  }
  constructor(private router: Router) {
    this.loadUsers();
  }

  public getCurrentUser(): User | undefined {
    return this.currentUser;
  }
  private loadUsers(): void {
    const users = localStorage.getItem('users');
    if (users) {
      this.users = JSON.parse(users) as User[];
    }
  }

  private getUsers(): User[] {
    return this.users;
  }

  private generateToken(): string {
    return Math.random().toString(36) + Math.random().toString(36);
  }

  public checkUser(user: User): Observable<boolean> {
    const foundUser = this.users.find(
      (us) => us.password === user.password && us.login === user.login
    );
    if (foundUser) {
      this.currentUser = foundUser;
      this._isAuthenticated$.next(true);
      return of(true);
    } else {
      this.currentUser = undefined;
      this._isAuthenticated$.next(false);
      return of(false);
    }
  }

  public saveUser(user: User): Observable<boolean> {
    user.token = this.generateToken();
    this.currentUser = user;
    this._isAuthenticated$.next(true);
    this.users.push(user);
    const jsonUsers = JSON.stringify(this.users);
    localStorage.setItem('users', jsonUsers);
    return of(true);
  }

  public logout(): void {
    this.currentUser = undefined;
    this._isAuthenticated$.next(false);
    localStorage.removeItem('user');
    this.router.navigateByUrl('');
  }

  ngOnDestroy(): void {
    this._isAuthenticated$.next(false);
    this._isAuthenticated$.complete();
  }
}
