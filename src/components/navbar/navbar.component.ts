import { AuthGuard, AuthGuardService } from './../../services/auth-guard.service';
import { Component, HostListener, Output, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnChanges } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { User } from 'src/pages/auth/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
  isOpen: boolean = false;
  isMenuOpen: boolean = true;
  user: User=null;
  userSubscription: Subscription;

  //@Output() openMenu:boolean = window.innerWidth>770;
isAuth: boolean = false;
constructor(private authService: AuthService, private authenticationService:AuthenticationService , private router: Router){
  this.userSubscription=this.authenticationService.userT.subscribe((user:User) =>{
      this.user= user;
      console.log("Este es mi: "+user);
      this.user?(this.isAuth=true):(this.isAuth=false);

  });
  // this.authService.authenticated.subscribe(auth =>{
  //   this.isAuth=auth;
  //   //this.isAuth?this.router.navigate(['home']):this.router.navigate(['login']);
  // });
}

  ngOnInit(): void {
    //this.authService.loggin();
   this.isAuth= this.authService.loggedIn;
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  loggin=()=>{

    this.authService.loggin();
    //this.isAuth= this.authService.loggedIn;
    this.router.navigate(['home']);
  }

  loggout=()=>{
    //this.authService.loggout();
    //this.authenticationService.userT.next(null);
    this.authenticationService.signOut();
    this.isAuth=false;
    this.isOpen=false;
    this.router.navigate(['login']);
    //this.isAuth= this.authService.loggedIn;
  }


@HostListener('window:resize', ['$event'])
onResize(event: { target: { innerWidth: number; }; }) {
  console.log(event.target.innerWidth)
  event.target.innerWidth>767?this.isMenuOpen=true:this.isMenuOpen=false;
}




}
