import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilterPipe } from 'src/pipes/filter.pipe';
import { RecipeRoutingModule } from './recipe-routing.module';
import { AuthenticationGuardService } from 'src/services/authentication-guard.service';
import { CookieService } from 'ngx-cookie-service';
import { RecipeService } from 'src/services/recipe.service';
import { LogginService } from 'src/services/loggin.service';
import { AccountService } from 'src/services/account.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptorService } from 'src/services/logging-interceptor.service';
import { AuthInterceptorService } from 'src/services/auth-interceptor.service';
import { AuthenticationInterceptorService } from 'src/services/authentication-interceptor.service';



@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RecipeRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true},
    AccountService,
    LogginService,
    RecipeService,
    AuthenticationGuardService,
    CookieService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true}

  ],
  exports: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeItemComponent
  ]
})
export class RecipeModuleModule { }
