import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { ShoppingService } from 'src/services/shopping.service';
import { ingredient } from 'src/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{


@Output() isOpen = false;

  subscriber: Subscription;
  ingredients:ingredient[]=[];

  constructor(private shoppingService: ShoppingService,private authenttication: AuthenticationService) {
    this.subscriber=this.shoppingService.changeIngredients.subscribe((ingredients:ingredient[]) => {this.ingredients = ingredients});

  }

  /*addIngredient(data: any) {
    this.shoppingService.addIngredient(new ingredient(data.name, data.quantity));
    //this.ingredients.push(new ingredient(data.name, data.quantity));
  }*/
  ngOnInit(): void {
    this.authenttication.autoSingUp();
    this.ingredients= this.shoppingService.getIngredients();
  }

  ngOnDestroy(): void {
   this.subscriber.unsubscribe();
  }

  delete(id:number):void{
    this.shoppingService.deleteIngredient(id);
    console.log(id);
  }

}
