import { Offer, TableOfferColumns } from './offer';

export class Order {
  offer: Offer;
  weight: number;
  constructor(offer: Offer, weight: number) {
    this.offer = offer;
    this.weight = weight;
  }
}

export const TableOrderColumns: string[] = ['offerWeight'].concat(
  TableOfferColumns
);
