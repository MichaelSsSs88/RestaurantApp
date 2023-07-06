import { Router } from '@angular/router';
import { ingredient } from './../../../shared/ingredient.model';
import { recipe } from './../recipe.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  //@Output() miEvento = new EventEmitter();
  recipeList:recipe [];

  constructor(private recipeService: RecipeService, private router: Router){

  }
  ngOnInit(): void {
    this.recipeList =this.recipeService.recipeList;
  }





  emitirEvento(name:string, description:string, imagePath:string, ingredients:ingredient[], index:number) {

    //this.recipeService.selectRecipe(new recipe(name,description,imagePath));
    //this.recipeService.recipeSelectedEvent.emit(new recipe(name,description,imagePath,ingredients));
    //this.recipeService.recipeSelectedEvent.emit(this.recipeService.getRecipeById(index));
    this.recipeService.recipeSelectedEvent.next(this.recipeService.getRecipeById(index));

    this.router.navigate(['home',index]);
    //console.log(this.recipeService.recipeSelectedEvent)
    // const data = {
    //   "name":name,
    //   "description":description,
    //   "imagePath":imagePath
    // };

    //this.miEvento.emit(data);
  }

}
