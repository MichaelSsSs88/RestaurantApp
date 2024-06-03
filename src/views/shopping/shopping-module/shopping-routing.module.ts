import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from 'src/services/authentication-guard.service';
import { GameControlComponent } from 'src/views/game-control/game-control.component';
import { ShoppingEditComponent } from '../shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';



const routes: Routes = [
  { path: '', canActivate: [AuthenticationGuardService], component: ShoppingListComponent,
  children:[
    {path:'new',component: ShoppingEditComponent},
    { path: ':id/edit', component:  ShoppingEditComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule {

}
