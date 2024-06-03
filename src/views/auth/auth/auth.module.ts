import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '../auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoadingComponent } from 'src/components/loading/loading.component';
import { AlertComponent } from 'src/components/alert/alert.component';
import { PlaceholderDirective } from 'src/directives/placeholder.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CounterComponent } from 'src/counter/counter.component';
import { AppModule } from 'src/app/app.module';



@NgModule({
  declarations: [
    LoadingComponent,
    AuthComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [
    //CommonModule,
    SharedModule,
    AuthRoutingModule,
    //FormsModule,
    //ReactiveFormsModule,
    //RouterModule,
  ]
})
export class AuthModule {

}
