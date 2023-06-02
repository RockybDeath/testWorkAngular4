import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Offer } from '../../../models/offer';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-workplace-offer-creation',
  templateUrl: './workplace-offer-creation.component.html',
  styleUrls: ['./workplace-offer-creation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkplaceOfferCreationComponent {
  public form!: FormGroup;
  constructor() {
    this.createForm();
  }

  public createForm(): void {
    this.form = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      href: new FormControl<string>('', Validators.required),
      weight: new FormControl<number>(0, Validators.required),
      amount: new FormControl<number>(0, Validators.required),
    });
  }

  public getOrder(): Order | undefined {
    if (this.form.valid) {
      const order = {} as Order;
      order.weight = this.form.value.weight;
      order.offer = this.createOffer();
      return order;
    } else return undefined;
  }

  private createOffer(): Offer {
    const value = this.form.value;
    const offer = {} as Offer;
    offer.href = value.href;
    offer.amount = value.amount;
    offer.name = value.name;
    return offer;
  }
}
