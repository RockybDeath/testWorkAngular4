import { Campaign } from './campaign';
import { Application } from './application';
import { Order } from './order';
import { EntityEnum } from './entity.enum';

export type DialogData = {
  object: Campaign | Application | Order | undefined;
  typeOfEntity: EntityEnum;
};
