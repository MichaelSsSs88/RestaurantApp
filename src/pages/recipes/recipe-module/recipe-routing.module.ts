import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from 'src/services/authentication-guard.service';
import { RecipeComponent } from '../recipe/recipe.component';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { GameControlComponent } from 'src/pages/game-control/game-control.component';



const routes: Routes = [
  {
    //path: 'home', canActivate: [AuthenticationGuardService], component: RecipeComponent,
    path: '', canActivate: [AuthenticationGuardService], component: RecipeComponent,
    children: [
      { path: '', component:  RecipeDetailComponent},
      { path: 'new', component:  RecipeEditComponent},
      { path: ':id', component:  RecipeDetailComponent},
      { path: ':id/edit', component:  RecipeEditComponent/*, children:[
        { path: '', component:  ShoppingEditComponent},
      ]*/}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule {

}
