import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import { RecipeComponent } from 'src/pages/recipes/recipe/recipe.component';
import { RecipeListComponent } from 'src/pages/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from 'src/pages/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from 'src/pages/recipes/recipe-item/recipe-item.component';
import { ShoppingEditComponent } from 'src/pages/shopping/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from 'src/pages/shopping/shopping-list/shopping-list.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { GameControlComponent } from 'src/pages/game-control/game-control.component';
import { EvenComponent } from 'src/pages/even/even.component';
import { OddComponent } from 'src/pages/odd/odd.component';
import { ColorDirectiveDirective } from 'src/directives/color-directive.directive';
import { CheckDirective } from 'src/directives/check.directive';
import { DropdownDirective } from 'src/directives/dropdown.directive';
import { NewAccountComponent } from './new-account/new-account.component';
import { AccountComponent } from './account/account.component';
import { LogginService } from 'src/services/loggin.service';
import { AccountService } from 'src/services/account.service';
import { RecipeService } from 'src/services/recipe.service';
import { ShoppingService } from 'src/services/shopping.service';
import { NotFoundComponent } from 'src/pages/not-found/not-found.component';
import { GameService } from 'src/services/game.service';
import { RecipeEditComponent } from 'src/pages/recipes/recipe-edit/recipe-edit.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingEditComponent,
    ShoppingListComponent,
    GameControlComponent,
    RecipeEditComponent,
    EvenComponent,
    OddComponent,
    NewAccountComponent,
    AccountComponent,
    NotFoundComponent,
    ColorDirectiveDirective,
    CheckDirective,
    DropdownDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AccountService,
    LogginService,
    RecipeService,
    ShoppingService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
