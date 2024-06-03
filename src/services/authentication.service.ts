import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from "rxjs";
import { ResponseInterface } from "src/interfeces/response.interface";
import { User } from "src/views/auth/user.model";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  type: string = 'signUp';
  userTx = new Observable<User>();
  userT = new BehaviorSubject<User>(null);
  user: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  token: string = null;
  private tokenExpirationTimer: any;


  constructor(private http: HttpClient, private cookieService:CookieService, private router:Router) { }
  //This method has to receive the as a type the word: register or login
  signUp(email: string, password: string, type: string) {
    type == "register" ? this.type = 'signUp' : this.type = 'signInWithPassword';
    const url: string = `https://identitytoolkit.googleapis.com/v1/accounts:${this.type}?key=AIzaSyD3y-etARWRbozS50z9vUdKM9gn5qW6LP0`;
    return this.http.post<ResponseInterface>(url, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(restData => {
          this.handleAuthentication(restData);
    }

    ))


    //Both ways to handle errors inside the sam function or adding other function
    // .pipe(catchError(errorRes=>{
    //   let errorMessage="An unknown error occurred";
    //   if(!errorRes.error || !errorRes.error.error){
    //     return throwError(()=> new Error(errorMessage))
    //   }
    //   switch (errorRes.error.error.message) {
    //     case 'EMAIL_EXISTS':
    //       errorMessage="This user already exists";
    //       break;
    //     case 'EMAIL_NOT_FOUND':
    //       errorMessage="This user does not exist";
    //       break;
    //     case 'INVALID_PASSWORD':
    //       errorMessage="This user does not exist";
    //       break;
    //     case 'TOO_MANY_ATTEMPTS_TRY_LATER':
    //       errorMessage="The account has been bloked, try later";
    //       break;

    //     default:
    //       break;
    //   }
    //   return throwError(()=> new Error(errorMessage))
    // }));
  }

  autoSingUp(){
    try {
      const user:{email:string,id:string,_token:string,_tokenExpirationDate:Date}=JSON.parse(this.cookieService.get('userAdded'));
      let userLoaded:User=new User(user.email,user.id,user._token,user._tokenExpirationDate);
      const expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoSignOut(expirationDuration);
      userLoaded.getToken()&&this.userT.next(userLoaded);
    } catch (error) {

    }

    //return userLoaded;
  }

  signOut=()=>{
    this.cookieService.delete('userAdded');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
      this.router.navigate(['/login']);
    }
    this.tokenExpirationTimer=null;
    this.userT.next(null);
  }

  autoSignOut=(expirationDuration:number)=>{
     this.tokenExpirationTimer= setTimeout(() => {
        this.signOut();
      }, expirationDuration);
  }


  private handleAuthentication(responseData:ResponseInterface){
    const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
      const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
      this.cookieService.set('userAdded', JSON.stringify(user));
      this.autoSignOut(+responseData.expiresIn * 1000);
      this.userT.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred";
    console.log("Errores:"+errorRes.error.error.message);

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage))
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "This user already exists";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "This user does not exist";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "This user does not exist";
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = "The account has been bloked, try later";
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
        errorMessage = "The account has been bloked, try later.";
        break;

      default:
        break;
    }
    return throwError(() => new Error(errorMessage))

  }

  signIn(email: string, password: string) {
    this.type = 'signInWithPassword';

  }
}
