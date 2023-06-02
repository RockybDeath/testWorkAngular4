import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Application, TableApplicationColumns } from '../models/application';

@Injectable()
export class ApplicationStorageService implements OnDestroy {
  private _applications$: BehaviorSubject<Application[]> = new BehaviorSubject<
    Application[]
  >([]);
  public get applications$(): Observable<Application[]> {
    return this._applications$.asObservable();
  }

  public getColumns(): string[] {
    return TableApplicationColumns;
  }
  constructor() {}

  public saveApplications(applications: Application[]): void {
    this._applications$.next(applications);
  }

  public addApplication(application: Application): void {
    const applications = this._applications$.value;
    applications.push(application);
    this._applications$.next(applications);
  }

  public deleteApplication(application: Application): void {
    let applications = this._applications$.value;
    applications = applications.filter((app) => app.name !== application.name);
    this._applications$.next(applications);
  }

  ngOnDestroy(): void {
    this._applications$.next([]);
    this._applications$.complete();
  }
}
