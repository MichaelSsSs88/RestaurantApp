import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService{

  constructor(private authentication:AuthenticationService) {

  }

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):boolean|Promise<boolean> | Observable<boolean>=> {

    return this.authentication.userT.pipe(take(1),map(user =>{
        return !!user;
    }));
  }

}
