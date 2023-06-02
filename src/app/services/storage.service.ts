import { Injectable } from '@angular/core';
import { ApplicationStorageService } from './application-storage.service';
import { CampaignStorageService } from './campaign-storage.service';
import { Application } from '../models/application';
import { Campaign } from '../models/campaign';
import { OrderStorageService } from './order-storage.service';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable()
export class StorageService {
  constructor(
    private applicationStorage: ApplicationStorageService,
    private orderStorage: OrderStorageService,
    private campaignStorage: CampaignStorageService
  ) {
    this.getDataFromLocalStorage();
  }
  public getDataFromLocalStorage(): void {
    const dataBase = localStorage.getItem('dataBase');
    if (dataBase) {
      const applications = JSON.parse(dataBase) as Application[];
      this.applicationStorage.saveApplications(applications);
      this.setCampaigns(applications);
      this.setOrders(applications);
    }
  }

  public setCampaigns(applications: Application[]): void {
    const campaigns = applications.reduce((resultArray, application) => {
      if (application.campaign) {
        resultArray.push(application.campaign);
      }
      return resultArray;
    }, [] as Campaign[]);
    this.campaignStorage.saveCampaigns(campaigns);
  }

  public setOrders(applications: Application[]): void {
    const orders = applications.reduce((resultArray, application) => {
      if (application.campaign?.orders) {
        resultArray.concat(application.campaign.orders);
      }
      return resultArray;
    }, [] as Order[]);
    this.orderStorage.saveOrders(orders);
  }

  public getApplications(): Observable<Application[]> {
    return this.applicationStorage.applications$;
  }

  public getCampaigns(): Observable<Campaign[]> {
    return this.campaignStorage.campaigns$;
  }

  public getOrders(): Observable<Order[]> {
    return this.orderStorage.orders$;
  }

  public getColumnsOrders(): string[] {
    return this.orderStorage.getColumns();
  }

  public getColumnCampaigns(): string[] {
    return this.campaignStorage.getColumns();
  }

  public getColumnApplications(): string[] {
    return this.applicationStorage.getColumns();
  }

  public refreshDataBase(): void {}
}
