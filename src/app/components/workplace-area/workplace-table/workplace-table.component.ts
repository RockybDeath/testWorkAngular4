import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { DestroyService } from '../../../services/destroy.service';
import { BehaviorSubject, map, Observable, takeUntil } from 'rxjs';
import { Application } from '../../../models/application';
import { Campaign } from '../../../models/campaign';
import { Order } from '../../../models/order';
import { EntityEnum } from '../../../models/entity.enum';
import { MatTableDataSource } from '@angular/material/table';
import { ActionEnum } from '../../../models/action.enum';
import { WorkplaceActionDialogComponent } from '../workplace-action-dialog/workplace-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../../models/dialog-data';

@Component({
  selector: 'app-workplace-table',
  templateUrl: './workplace-table.component.html',
  styleUrls: ['./workplace-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkplaceTableComponent implements OnDestroy {
  public dataSource$?: Observable<
    MatTableDataSource<Application | Campaign | Order>
  >;
  public displayedColumns$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  public chosenObject: Application | Campaign | Order | undefined = undefined;
  public entityMode: EntityEnum = EntityEnum.APPLICATIONS;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private destroy$: DestroyService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data?.['entity']) {
        this.entityMode = data['entity'];
        switch (data['entity']) {
          case EntityEnum.APPLICATIONS:
            this.setDataSource(this.storageService.getApplications());
            this.displayedColumns$.next(
              this.storageService.getColumnApplications()
            );
            break;
          case EntityEnum.CAMPAIGNS:
            this.setDataSource(this.storageService.getCampaigns());
            this.displayedColumns$.next(
              this.storageService.getColumnCampaigns()
            );
            break;
          case EntityEnum.OFFERS:
            this.setDataSource(this.storageService.getOrders());
            this.displayedColumns$.next(this.storageService.getColumnsOrders());
            break;
        }
      }
    });
  }

  private setDataSource(
    dataSource: Observable<Order[] | Application[] | Campaign[]>
  ) {
    this.dataSource$ = dataSource.pipe(
      map((data) => {
        const dataSource = new MatTableDataSource<
          Application | Campaign | Order
        >();
        dataSource.data = data;
        return dataSource;
      })
    );
  }

  public action(action: ActionEnum): void {
    switch (action) {
      case ActionEnum.CREATE:
        // eslint-disable-next-line no-case-declarations
        this.dialog.open(WorkplaceActionDialogComponent, {
          data: {
            object: undefined,
            typeOfEntity: this.entityMode,
          } as DialogData,
        });
        break;
      case ActionEnum.EDIT:
        break;
      case ActionEnum.DELETE:
        if (this.chosenObject) {
          this.storageService.deleteEntity(this.chosenObject, this.entityMode);
        }
        break;
    }
  }

  public selectEntity(entity: Application | Order | Campaign): void {
    this.chosenObject = entity;
  }

  public ngOnDestroy(): void {
    this.displayedColumns$.next([]);
    this.displayedColumns$.complete();
  }

  protected readonly ActionEnum = ActionEnum;
}
