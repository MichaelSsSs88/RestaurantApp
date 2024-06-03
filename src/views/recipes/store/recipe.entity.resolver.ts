import { filter, first, tap } from 'rxjs';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { RecipeEntityService } from './recipe.entity.service';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeEntityResolver{
  constructor(private recipeEntityService:RecipeEntityService) {

  }

  resolve:ResolveFn<any>=(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<any> => {
      return this.recipeEntityService.loaded$.pipe(
        tap(loaded=>{
          if(!loaded)
            this.recipeEntityService.getAll();
        }),
        filter(loaded=>!!loaded),
        first()
      )
  }

}
