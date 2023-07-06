import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateFn, CanActivateChildFn} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  constructor(private router:Router) { }
  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    alert("Checking for activated");
    return false;
  }*/


  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    //authService.loggin();
    return authService.isAuthenticated().then((authenticated:boolean) => {

        if(authenticated)return authenticated;
        else this.router.navigate(["/asdasdsad"])

    }).catch((err) => {
      return false;
    });
  };

  canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => this.canActivate(route, state);
}

export const AuthGuard: CanActivateChildFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  return inject(AuthGuardService).canActivate(next, state);
}

