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
import { RecipeComponent } from '../recipe/recipe.component';
import { ShortenPipe } from 'src/pipes/shorten.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { RecipeEntityService } from '../store/recipe.entity.service';
import { RecipeDataService } from '../store/recipe.data.service';
import { RecipeEntityResolver } from '../store/recipe.entity.resolver';


const recipeMetaData:EntityMetadataMap={
  recipes:{
    entityDispatcherOptions:{
      optimisticUpdate: true,
    },
  }
}

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    FilterPipe,
    ShortenPipe,
  ],
  imports: [
    //CommonModule,
    //FormsModule,
    //ReactiveFormsModule,
    //RouterModule,
    SharedModule,
    RecipeRoutingModule
  ],
  providers:[
    // RecipeEntityService,
    // RecipeDataService,
    // RecipeEntityResolver,
  ]
  // exports: [
  //   RecipeListComponent,
  //   RecipeDetailComponent,
  //   RecipeEditComponent,
  //   RecipeItemComponent
  // ]
})

export class RecipeModuleModule {

  constructor(private entityDefinitionService:EntityDefinitionService,
              private entityDataService:EntityDataService,
              private recipeDataService:RecipeDataService) {
          entityDefinitionService.registerMetadataMap(recipeMetaData);
          entityDataService.registerService("recipes", recipeDataService);
          console.log("*************************************");
          console.log(entityDataService.getService("recipes"));
          console.log("*************************************");

  }
}
