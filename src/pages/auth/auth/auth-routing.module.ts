import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from 'src/services/authentication-guard.service';
import { GameControlComponent } from 'src/pages/game-control/game-control.component';
import { AuthComponent } from '../auth.component';




const routes: Routes = [
  {path: '',component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
