import { AuthenticationGuardService } from './../services/authentication-guard.service';
import { NgModule, OnInit, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import { RecipeComponent } from 'src/views/recipes/recipe/recipe.component';
import { ShoppingEditComponent } from 'src/views/shopping/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from 'src/views/shopping/shopping-list/shopping-list.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { GameControlComponent } from 'src/views/game-control/game-control.component';
import { EvenComponent } from 'src/views/even/even.component';
import { OddComponent } from 'src/views/odd/odd.component';
import { ColorDirectiveDirective } from 'src/directives/color-directive.directive';
import { CheckDirective } from 'src/directives/check.directive';
import { DropdownDirective } from 'src/directives/dropdown.directive';
import { NewAccountComponent } from './new-account/new-account.component';
import { AccountComponent } from './account/account.component';
import { LogginService } from 'src/services/loggin.service';
import { AccountService } from 'src/services/account.service';
import { RecipeService } from 'src/services/recipe.service';
import { ShoppingService } from 'src/services/shopping.service';
import { NotFoundComponent } from 'src/views/not-found/not-found.component';
import { GameService } from 'src/services/game.service';
import { AsyncPipe, CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ShortenPipe } from 'src/pipes/shorten.pipe';
import { AuthInterceptorService } from 'src/services/auth-interceptor.service';
import { LoggingInterceptorService } from 'src/services/logging-interceptor.service';
import { AuthComponent } from 'src/views/auth/auth.component';
import { LoadingComponent } from 'src/components/loading/loading.component';
import { AuthenticationInterceptorService } from 'src/services/authentication-interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { AlertComponent } from 'src/components/alert/alert.component';
import { PlaceholderDirective } from 'src/directives/placeholder.directive';
import { RecipeModuleModule } from 'src/views/recipes/recipe-module/recipe-module.module';
import { ShoppingModuleModule } from 'src/views/shopping/shopping-module/shopping-module.module';
import { AuthModule } from 'src/views/auth/auth/auth.module';
import { StoreModule, provideStore } from '@ngrx/store';
import { counterReducerArrayFunction, counterReducerConst, counterReducerFunction } from 'src/counter/store/counter.reducer';
import { CounterComponent } from 'src/counter/counter.component';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from 'src/counter/store/counter.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    //RecipeComponent,
    GameControlComponent,
    EvenComponent,
    OddComponent,
    //NewAccountComponent,
    //AccountComponent,
    NotFoundComponent,
    ColorDirectiveDirective,
    DropdownDirective,
    CounterComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RecipeModuleModule,
    FormsModule,

   // ShoppingModuleModule,


   // CommonModule,
    //ReactiveFormsModule,
    HttpClientModule,

    StoreModule.forRoot({counter:counterReducerFunction, counterReducerConst:counterReducerConst, counterReducerFn:counterReducerArrayFunction}),

    EffectsModule.forRoot([CounterEffects]),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

    EntityDataModule.forRoot(entityConfig),
  ],
      providers: [
  //   {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true},
  //   AccountService,
  //   LogginService,
  //   RecipeService,
  //   ShoppingService,
  //   AuthenticationGuardService,
  //   GameService,
  //   CookieService,
  //   {provide: LocationStrategy, useClass: HashLocationStrategy},
  //   {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
       {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true}

   ],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  //userSubscription:Subscription= new Subscription();
  constructor(){
    //this.authentication.autoSingUp();
    // this.userSubscription= this.authentication.userT.subscribe(user =>{
    //   if(user!=null){
    //     this.recipeService.getData();
    //     console.log(user);

    //     this.router.navigate(['home']);
    //   }
    //     //console.log(user);
    // });

  }
  ngOnInit(): void {

  }
 }
