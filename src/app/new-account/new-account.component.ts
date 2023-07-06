import { LogginService } from 'src/services/loggin.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {
  //@Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  constructor(private logginService: LogginService, private accountService: AccountService) {
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.onAccountAdded({name:accountName, status:accountStatus});
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });
    console.log('A server status changed, new status: ' + accountStatus);
    //this.logginService.logStatusChange(accountStatus);
  }
}
