import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from 'src/services/authentication-guard.service';
import { RecipeComponent } from '../recipe/recipe.component';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { GameControlComponent } from 'src/views/game-control/game-control.component';
import { NotFoundComponent } from 'src/views/not-found/not-found.component';
import { RecipeEntityResolver } from '../store/recipe.entity.resolver';



const routes: Routes = [
  {
    //path: 'home', canActivate: [AuthenticationGuardService], component: RecipeComponent,
    path: '', canActivate: [AuthenticationGuardService], component: RecipeComponent,
    children: [
      { path: ':id/detail', component:  RecipeDetailComponent},
      { path: 'detail', component:  RecipeDetailComponent},
      { path: 'new', pathMatch:'full', component:  RecipeEditComponent},
      { path: ':id/edit', pathMatch:'full', component:  RecipeEditComponent/*, children:[
        { path: '', component:  ShoppingEditComponent},
      ]*/},
      {path:'**',redirectTo:'/login'}
    ],
    resolve:{
      recipes: RecipeEntityResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule {

}
