import { Injectable,EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class TempStorageService {

  constructor() { }

  private balance = new BehaviorSubject<any>('');
  currentBalance = this.balance.asObservable();

  sendBalance(message:any) {
    this.balance.next(message);
  }

}
