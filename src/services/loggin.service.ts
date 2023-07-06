import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogginService {

  constructor() { }

  logStatusChange(status:string):void {console.log("A server status has been changed, new status: " + status);
  }
}
