import { AuthenticationGuardService } from './../services/authentication-guard.service';
//import { AuthGuard } from './../services/auth-guard.service';

import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { AlertComponent } from 'src/components/alert/alert.component';
import { CounterComponent } from 'src/counter/counter.component';
import { AuthComponent } from 'src/views/auth/auth.component';
import { GameControlComponent } from 'src/views/game-control/game-control.component';
import { NotFoundComponent } from 'src/views/not-found/not-found.component';
import { RecipeDetailComponent } from 'src/views/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from 'src/views/recipes/recipe-edit/recipe-edit.component';
import { RecipeComponent } from 'src/views/recipes/recipe/recipe.component';
import { ShoppingEditComponent } from 'src/views/shopping/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from 'src/views/shopping/shopping-list/shopping-list.component';



const routes: Routes = [
  {path: '',  redirectTo: '/login', pathMatch:'full'},
  { path: 'counter', component: CounterComponent },
  {path: 'home', loadChildren:()=>import('../views/recipes/recipe-module/recipe-module.module').then((m)=>m.RecipeModuleModule)},
  {path: 'shopping', loadChildren:()=>import('../views/shopping/shopping-module/shopping-module.module').then((m)=>m.ShoppingModuleModule)},
  //{path: 'login',component: AuthComponent},
  // {
  //   path: 'home', canActivate: [AuthenticationGuardService], component: RecipeComponent,
  //   children: [
  //     { path: '', component:  RecipeDetailComponent},
  //     { path: 'new', component:  RecipeEditComponent},
  //     { path: 'game', component: GameControlComponent },
  //     { path: ':id', component:  RecipeDetailComponent},
  //     { path: ':id/edit', component:  RecipeEditComponent/*, children:[
  //       { path: '', component:  ShoppingEditComponent},
  //     ]*/}
  //   ]
  // },
  {path: 'login', loadChildren:()=>import('../views/auth/auth/auth.module').then((m)=>m.AuthModule)},

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
  //{path:'home/:id/:name', component: RecipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
