//import { AuthGuard } from './../services/auth-guard.service';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameControlComponent } from 'src/pages/game-control/game-control.component';
import { NotFoundComponent } from 'src/pages/not-found/not-found.component';
import { RecipeDetailComponent } from 'src/pages/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from 'src/pages/recipes/recipe-edit/recipe-edit.component';
import { RecipeComponent } from 'src/pages/recipes/recipe/recipe.component';
import { ShoppingEditComponent } from 'src/pages/shopping/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from 'src/pages/shopping/shopping-list/shopping-list.component';
import { AuthGuard, AuthGuardService } from 'src/services/auth-guard.service';
import { AuthService } from 'src/services/auth.service';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch:'full'},
  { path: 'shopping', component: ShoppingListComponent,
  children:[
    {path:'new',component: ShoppingEditComponent},
    { path: ':id/edit', component:  ShoppingEditComponent}
  ] },
  {
    path: 'home', /*canActivate: [AuthGuard],*/ component: RecipeComponent,
    children: [
      { path: '', component:  RecipeDetailComponent},
      { path: 'new', component:  RecipeEditComponent},
      { path: 'game', component: GameControlComponent },
      { path: ':id', component:  RecipeDetailComponent},
      { path: ':id/edit', component:  RecipeEditComponent/*, children:[
        { path: '', component:  ShoppingEditComponent},
      ]*/}
    ]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
  //{path:'home/:id/:name', component: RecipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
