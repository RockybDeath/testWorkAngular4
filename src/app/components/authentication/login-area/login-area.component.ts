import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, takeUntil } from 'rxjs';
import { DestroyService } from '../../../services/destroy.service';
import { LoginEnum } from '../../../models/login.enum';

@Component({
  selector: 'app-login-area',
  templateUrl: './login-area.component.html',
  styleUrls: ['./login-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginAreaComponent implements OnInit {
  public form?: FormGroup;
  private modeOfLogin: LoginEnum = LoginEnum.REGISTER;
  private readonly returnUrl: string;

  public constructor(
    private userService: UserService,
    private router: Router,
    private _route: ActivatedRoute,
    private destroy$: DestroyService
  ) {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '';
    this.createForm();
  }

  public ngOnInit(): void {
    this.userService.isAuthenticated$
      .pipe(filter(Boolean), takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
  }

  public createForm(): void {
    this.form = new FormGroup({
      login: new FormControl<string>(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[A-Za-z]+$'),
        ])
      ),
      password: new FormControl<number | undefined>(
        undefined,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ])
      ),
    });
  }

  public changeMode(event: any): void {
    if (event.index) {
      this.modeOfLogin = LoginEnum.SIGN_IN;
    } else {
      this.modeOfLogin = LoginEnum.REGISTER;
    }
  }
  public onSubmit(): void {
    if (this.form?.valid) {
      const user = this.form.value as User;
      switch (this.modeOfLogin) {
        case LoginEnum.REGISTER:
          this.authorized(this.userService.saveUser(user));
          break;
        case LoginEnum.SIGN_IN:
          this.authorized(this.userService.checkUser(user));
          break;
      }
    }
  }

  public authorized(obs: Observable<boolean>): void {
    obs.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe(() => {
      this.router.navigateByUrl('/workplace');
    });
  }

  protected readonly LoginEnum = LoginEnum;
}
