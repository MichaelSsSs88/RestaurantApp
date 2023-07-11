import { Subject } from 'rxjs';
import { ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  //changeIngredients:EventEmitter<ingredient[]> = new EventEmitter<ingredient[]>();
  changeIngredients:Subject<ingredient[]> = new Subject<ingredient[]>();
  ingredients = [new ingredient("Apple", 5),
  new ingredient("Banana", 5),
  new ingredient("Chicken", 5),
  new ingredient("Rice", 5),
  new ingredient("Pork", 5),
  new ingredient("Beans", 5),
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }
  getIngredientById(id:number){
    return this.ingredients[id];
  }

  addIngredient=(ingredient:ingredient) => {
    this.ingredients.push(ingredient);
    this.changeIngredients.next(this.ingredients);
    console.log(this.ingredients)
  }

  editIngredient=(id:number,ingredient:ingredient) => {
    this.ingredients[id].name=ingredient.name;
    this.ingredients[id].amount=ingredient.amount;
    this.changeIngredients.next(this.ingredients);
  }

  deleteIngredient(id:number):void{
    this.ingredients=this.ingredients.filter((item,index)=>{
      if(id!=index){return item};
    })//.splice(id, id-1);
    this.changeIngredients.next(this.ingredients);
  }

  addIngredients=(ingredients:ingredient[]) => {
    this.ingredients.push(...ingredients);
    this.changeIngredients.next(this.ingredients);
  }
}
