import { recipe } from 'src/views/recipes/recipe.model';
import { IRecipe } from './../recipe.interface';
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpClient } from "@angular/common/http";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Observable, map, tap } from "rxjs";
import { Update } from '@ngrx/entity';


@Injectable({providedIn: 'root'})
export class RecipeDataService extends DefaultDataService<IRecipe>{

  constructor(httpClient: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('recipes', httpClient, httpUrlGenerator);
  }

  override getAll(): Observable<IRecipe[]> {
    return this.http
      .get<recipe[]>(
        "https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json"
      )
      .pipe(
        tap(recipe => {  console.log(recipe)}),
        map(recipes => {
          return Object.entries(recipes).map(recipeItem => {
            return new recipe(recipeItem[0], recipeItem[1].name, recipeItem[1].description, recipeItem[1].imagePath, recipeItem[1].ingredients ? recipeItem[1].ingredients : [])
          });
        }),
      );
  }

  override update(update: Update<IRecipe>, options?: HttpOptions): Observable<IRecipe> {
    return this.http.patch(`https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe/${update.id}.json`, {
      name: update.changes.name,
      description: update.changes.description,
      imagePath: update.changes.imagePath,
      ingredients: update.changes.ingredients
    }).pipe(map(recipe=><recipe>recipe))
  }

  public getByName(){

  }


}
