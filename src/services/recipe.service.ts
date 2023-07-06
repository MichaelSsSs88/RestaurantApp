import { ingredient } from 'src/shared/ingredient.model';
import { recipe } from './../pages/recipes/recipe.model';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnInit{


  recipeList:recipe [];
  recipeSelected:recipe;
  //recipeSelectedEvent= new EventEmitter<recipe>();
  recipeSelectedEvent= new Subject<recipe>();
  constructor(){
    this.recipeList = new Array<recipe>();
    this.recipeList.push(new recipe("Chicken Rice","It is an exquisite rice prepare with chicken","https://assets.unileversolutions.com/recipes-v2/216417.jpg",new Array<ingredient>(new ingredient('potato',5))));
    this.recipeList.push(new recipe("Pork Rice","It is an exquisite rice prepare with pork","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmAHSaMatiUQP66fp8s5zqz9oxMC512X1ZAA&usqp=CAU", new Array<ingredient>(new ingredient('rice',50))));
    this.recipeList.push(new recipe("Sauce meat","It is an exquisite meat prepare with tomato sauce and  vegetables","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-t4wO8vHKj6P7VpzxjgrZeBbO-pAFv2YBQ&usqp=CAU",new Array<ingredient>(new ingredient('avocado',10))));
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }



  selectRecipe=(recipeGet:recipe)=>{
    //if(recipeGet!=null)this.recipeSelected= new recipe(recipeGet.name,recipeGet.description,recipeGet.imagePath);
  }

  getRecipe=()=>{
    return this.recipeSelected;
  }
  getRecipeById=(id:number)=>{
    return this.recipeList[id];
  }

}
