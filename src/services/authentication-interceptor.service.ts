import { CookieService } from 'ngx-cookie-service';
import { Params } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subscription, exhaustMap, take } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from 'src/pages/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor{
  userSubscriber: Subscription;
  constructor(private authenticationService:AuthenticationService, private cookieService:CookieService) {
    // this.authenticationService.autoSingUp();
    //  this.userSubscriber=this.authenticationService.userT.subscribe(user => {
    //     console.log("This is the user" + user);

    //  });

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //this.authenticationService.autoSingUp();
    ///let userLoaded:User=JSON.parse(this.cookieService.get('userAdded'));
   //console.log(userLoaded);

    //if(!userLoaded)return next.handle(req);
    //const modifiedRequest= req.clone({params: new HttpParams().set('auth',userLoaded.getToken())});
    //return next.handle(modifiedRequest)
   // this.userT.next(userLoaded);
    return this.authenticationService.userT.pipe(take(1),
                                            exhaustMap(user => {
                                                                if(!user)return next.handle(req);
                                                                const modifiedRequest= req.clone({params: new HttpParams().set('auth',user.getToken())});
                                                                return next.handle(modifiedRequest)}))
  }


}
