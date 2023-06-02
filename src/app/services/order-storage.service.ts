import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order, TableOrderColumns } from '../models/order';

@Injectable()
export class OrderStorageService implements OnDestroy {
  private _orders$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  public get orders$(): Observable<Order[]> {
    return this._orders$.asObservable();
  }

  public getColumns(): string[] {
    return TableOrderColumns;
  }
  constructor() {}

  public saveOrders(orders: Order[]): void {
    this._orders$.next(orders);
  }

  public addOrder(order: Order): void {
    const orders = this._orders$.value;
    orders.push(order);
    this._orders$.next(orders);
  }

  public deleteOrder(order: Order): void {
    let orders = this._orders$.value;
    orders = orders.filter((ord) => ord.offer?.name !== order.offer?.name);
    this._orders$.next(orders);
  }

  ngOnDestroy(): void {
    this._orders$.next([]);
    this._orders$.complete();
  }
}
