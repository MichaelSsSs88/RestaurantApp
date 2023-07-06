import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from 'src/services/account.service';
import { LogginService } from 'src/services/loggin.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  //providers: [LogginService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

constructor(private logginService:LogginService, private accountService:AccountService) {

}
  onSetTo(status: string) {
    //this.statusChanged.emit({id: this.id, newStatus: status});
    this.accountService.onStatusChanged({id: this.id, newStatus: status});
    this.accountService.statusUpdated.emit({id: this.id, status: status});
    //console.log('A server status changed, new status: ' + status);
    //this.logginService.logStatusChange(status);
    //this.logginService.logStatusChange(accountStatus);
  }
}
