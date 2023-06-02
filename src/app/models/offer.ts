export class Offer {
  name: string;
  href: string;
  amount: number;
  constructor(name: string, href: string, amount: number) {
    this.name = name;
    this.href = href;
    this.amount = amount;
  }
}

export const TableOfferColumns: string[] = [
  'offerName',
  'offerHref',
  'offerAmount',
];
