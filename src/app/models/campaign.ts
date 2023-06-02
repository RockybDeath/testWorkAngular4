import { Order, TableOrderColumns } from './order';

export class Campaign {
  name: string;
  orders: Order[];
  public constructor(name: string, orders: Order[]) {
    this.name = name;
    this.orders = orders;
  }
}

export const TableCampaignColumns: string[] = [
  'campaignName',
  'campaignWeight',
].concat(TableOrderColumns);
