import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, EntityServicesBase } from "@ngrx/data";
import { IRecipe } from "../recipe.interface";
import { HttpClient } from "@angular/common/http";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Observable, map } from "rxjs";
import { recipe } from "../recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeEntityService extends EntityCollectionServiceBase<IRecipe>{

  constructor(private serviceElementFactory:EntityCollectionServiceElementsFactory, private http:HttpClient) {
    super("recipes", serviceElementFactory);
  }

  // public getAll(): Observable<IRecipe[]> {
  //   return this.http
  //     .get<recipe[]>(
  //       "https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json"
  //     )
  //     .pipe(
  //       map(recipes => {
  //         return Object.entries(recipes).map(recipeItem => {
  //           return new recipe(recipeItem[0], recipeItem[1].name, recipeItem[1].description, recipeItem[1].imagePath, recipeItem[1].ingredients ? recipeItem[1].ingredients : [])
  //         });
  //       }),
  //     );
  // }

}
