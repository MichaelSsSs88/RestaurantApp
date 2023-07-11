import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private shoppingService: ShoppingService) {
    this.subscriber=this.shoppingService.changeIngredients.subscribe((ingredients:ingredient[]) => {this.ingredients = ingredients});
  }

  /*addIngredient(data: any) {
    this.shoppingService.addIngredient(new ingredient(data.name, data.quantity));
    //this.ingredients.push(new ingredient(data.name, data.quantity));
  }*/
  ngOnInit(): void {
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
