import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../../models/dialog-data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityEnum } from '../../../models/entity.enum';
import { Order } from '../../../models/order';
import { FormActionData } from '../../../models/formActionData';
import { Campaign } from '../../../models/campaign';
import { Application } from '../../../models/application';
import { WorkplaceOfferCreationComponent } from '../workplace-offer-creation/workplace-offer-creation.component';

@Component({
  selector: 'app-workplace-action-dialog',
  templateUrl: './workplace-action-dialog.component.html',
  styleUrls: ['./workplace-action-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkplaceActionDialogComponent implements AfterViewInit {
  public form!: FormGroup;
  @ViewChild('container', { read: ViewContainerRef })
  container?: ViewContainerRef;
  public offers: WorkplaceOfferCreationComponent[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<WorkplaceActionDialogComponent>
  ) {
    this.createForm();
    this.patchForm();
  }

  public addOfferComponent(): void {
    if (this.container) {
      const ref = this.container.createComponent(
        WorkplaceOfferCreationComponent
      );
      const newItem: WorkplaceOfferCreationComponent = ref.instance;
      this.offers.push(newItem);
    }
  }
  private createForm(): void {
    this.form = new FormGroup({});
    switch (this.data.typeOfEntity) {
      case EntityEnum.APPLICATIONS:
        this.addApplicationControls();
        this.addCampaignControls();
        break;
      case EntityEnum.CAMPAIGNS:
        this.addCampaignControls();
        break;
    }
    this.form.markAsTouched();
  }

  ngAfterViewInit(): void {
    if (this.data.typeOfEntity === EntityEnum.OFFERS) {
      this.addOfferComponent();
    }
  }
  private addApplicationControls(): void {
    this.form.addControl(
      'name',
      new FormControl<string>('', Validators.required)
    );
    this.form.addControl('switchOff', new FormControl<boolean>(false));
    this.form.addControl(
      'price',
      new FormControl<number>(0, Validators.required)
    );
  }

  private addCampaignControls(): void {
    this.form.addControl(
      'campaignName',
      new FormControl<string>('', Validators.required)
    );
  }

  public close(): void {
    this.dialogRef.close(null);
  }

  private patchForm(): void {
    if (this.data.object) {
      this.form.patchValue(this.data.object);
    }
  }

  public save(): void {
    if (this.form.valid) {
      const formValue: FormActionData = this.form.value as FormActionData;
      let result = undefined;
      switch (this.data.typeOfEntity) {
        case EntityEnum.APPLICATIONS:
          result = this.createApplication(formValue);
          break;
        case EntityEnum.CAMPAIGNS:
          result = this.createCampaign(formValue);
          break;
        case EntityEnum.OFFERS:
          result = this.offers[0].getOrder();
          break;
      }
      if (result) {
        this.dialogRef.close(result);
      }
    }
  }

  private createApplication(formData: FormActionData): Application {
    return new Application(
      formData.name,
      formData.switchOff,
      this.createCampaign(formData),
      formData.price
    );
  }

  private createCampaign(formData: FormActionData): Campaign {
    const orders = this.offers.reduce((ordersArray, offerComp) => {
      const order = offerComp.getOrder();
      if (order) {
        ordersArray.push(order);
      }
      return ordersArray;
    }, [] as Order[]);
    return new Campaign(formData.campaignName, orders);
  }

  protected readonly EntityEnum = EntityEnum;
}
