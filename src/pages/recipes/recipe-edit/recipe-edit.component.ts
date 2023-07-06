import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy{
  public subscriber: Subscription;
  index:number;

  constructor(private router: Router,private route:ActivatedRoute,private recipeService: RecipeService){
    this.subscriber = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.index=this.route.snapshot.params['id'];
      //this.recipeSelected = this.recipeService.getRecipeById(this.index);
    });

  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }



}
