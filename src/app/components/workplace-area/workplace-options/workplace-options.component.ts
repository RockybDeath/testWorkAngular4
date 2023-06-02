import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EntityEnum } from '../../../models/entity.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workplace-options',
  templateUrl: './workplace-options.component.html',
  styleUrls: ['./workplace-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkplaceOptionsComponent {
  protected readonly EntityEnum = EntityEnum;
  constructor(private router: Router) {}
  public navigateToChosenTable(chosenEntity: EntityEnum): void {
    switch (chosenEntity) {
      case EntityEnum.APPLICATIONS:
        this.router.navigateByUrl('workplace/applications');
        break;
      case EntityEnum.CAMPAIGNS:
        this.router.navigateByUrl('workplace/campaigns');
        break;
      case EntityEnum.OFFERS:
        this.router.navigateByUrl('workplace/offers');
        break;
    }
  }
}
