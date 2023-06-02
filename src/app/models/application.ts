import { Campaign, TableCampaignColumns } from './campaign';
import { User } from './user';

export class Application {
  name: string;
  switchOff: boolean;
  campaign: Campaign;
  price: number;
  creator!: User;
  constructor(
    name: string,
    switchOff: boolean,
    campaign: Campaign,
    price: number
  ) {
    this.name = name;
    this.switchOff = switchOff;
    this.campaign = campaign;
    this.price = price;
  }
}

export const TableApplicationColumns = [
  'applicationName',
  'switchOff',
  'price',
  'creatorName',
].concat(TableCampaignColumns);
