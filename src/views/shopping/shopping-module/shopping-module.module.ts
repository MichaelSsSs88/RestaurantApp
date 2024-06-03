import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingEditComponent } from '../shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CheckDirective } from 'src/directives/check.directive';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ShoppingEditComponent,
    ShoppingListComponent,
    CheckDirective,
  ],
  imports: [
    SharedModule,
    //BrowserModule,
    //CommonModule,
    //FormsModule,
    //ReactiveFormsModule,
    //RouterModule,
    ShoppingRoutingModule,
  ]
})
export class ShoppingModuleModule { }
