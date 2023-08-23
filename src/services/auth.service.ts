import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:boolean = false;
  authenticated= new Subject<boolean>();

  constructor(private router: Router) {
    this.authenticated.next(false)
  }

  isAuthenticated=async(): Promise<any>=> {
    const promise= new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 100);
    })
    return promise;
  }

  loggin=()=>{
    this.authenticated.next(true)
    this.loggedIn= true;
    //this.router.navigate(['home']);
  }

  loggout=()=>{
    this.authenticated.next(false)
    this.loggedIn= false;
  }

}
