import { AuthGuardService } from './../../services/auth-guard.service';
import { Component, HostListener, Output, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnChanges } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  //@Output() openMenu:boolean = window.innerWidth>770;
isAuth: boolean = false;
constructor(private authService: AuthService){

}
  ngOnInit(): void {
   this.isAuth= this.authService.loggedIn;
  }

  loggin=()=>{

    this.authService.loggin();
    this.isAuth= this.authService.loggedIn;
  }

  loggout=()=>{
    this.authService.loggout();
    this.isAuth= this.authService.loggedIn;
  }


@HostListener('window:resize', ['$event'])
onResize(event) {
  console.log(event.target.innerWidth)
  event.target.innerWidth>767?this.isMenuOpen=true:this.isMenuOpen=false;
}
 isOpen: boolean = false;
 isMenuOpen: boolean = true;



}
