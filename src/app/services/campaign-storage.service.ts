import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Campaign, TableCampaignColumns } from '../models/campaign';

@Injectable()
export class CampaignStorageService implements OnDestroy {
  private _campaigns$: BehaviorSubject<Campaign[]> = new BehaviorSubject<
    Campaign[]
  >([]);
  public get campaigns$(): Observable<Campaign[]> {
    return this._campaigns$.asObservable();
  }

  public getColumns(): string[] {
    return TableCampaignColumns;
  }
  constructor() {}

  public saveCampaigns(campaigns: Campaign[]): void {
    this._campaigns$.next(campaigns);
  }

  public addCampaign(campaign: Campaign): void {
    const campaigns = this._campaigns$.value;
    campaigns.push(campaign);
    this._campaigns$.next(campaigns);
  }

  public deleteCampaign(campaign: Campaign): void {
    let campaigns = this._campaigns$.value;
    campaigns = campaigns.filter((camp) => camp.name !== campaign.name);
    this._campaigns$.next(campaigns);
  }

  ngOnDestroy(): void {
    this._campaigns$.next([]);
    this._campaigns$.complete();
  }
}
