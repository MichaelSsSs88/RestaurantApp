import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:boolean = false;

  constructor() { }

  isAuthenticated=async(): Promise<any>=> {
    const promise= new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 100);
    })
    return promise;
  }

  loggin=()=>{
    this.loggedIn= true;
  }

  loggout=()=>{
    this.loggedIn= false;
  }

}
