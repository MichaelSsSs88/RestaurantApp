import { EventEmitter, Injectable } from '@angular/core';
import { LogginService } from './loggin.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  statusUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(private logginService: LogginService) { }

  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  onAccountAdded(newAccount: {name: string, status: string}) {
    this.accounts.push(newAccount);
    this.logginService.logStatusChange(newAccount.status);

  }

  onStatusChanged(updateInfo: {id: number, newStatus: string}) {
    console.log(updateInfo);

    this.accounts[updateInfo.id].status = updateInfo.newStatus;
    this.logginService.logStatusChange(updateInfo.newStatus);
  }
}
