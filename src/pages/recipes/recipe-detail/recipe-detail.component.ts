import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';
import { recipe } from '../recipe.model';
import { ingredient } from 'src/shared/ingredient.model';
import { ShoppingService } from 'src/services/shopping.service';
import { Subscription, filter } from 'rxjs';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit,OnChanges,OnDestroy {
  //@Input() name: string;
  //@Input() description: string;
  //@Input() imagePath: string;
  //@Input() ingredients:[];
  isOpen: boolean = false;

  recipeSelected:recipe;
  index:number;

  public subscriber: Subscription;


  constructor(public recipeService: RecipeService, private shoppingService:ShoppingService, private _router: Router, private route:ActivatedRoute){
    //this.recipeService.recipeSelectedEvent.subscribe((recipe:recipe)=>{this.recipeSelected=recipe;console.log(this.route.data['id'])});
    this.subscriber = this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.index=this.route.snapshot.params['id'];
      this.recipeSelected = this.recipeService.getRecipeById(this.index);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(this.ingredients)

  }
  ngOnInit(): void {
    //this.route.params['id'];
    this.recipeSelected = this.recipeService.getRecipeById(this.route.snapshot.params['id']);
   // this.recipeSelected = this.recipeService.recipeSelected;

    //this.recipe = this.recipeService.recipeSelected;
    //if(recipeGet!=null)this.recipe= new recipe(recipeGet.name, recipeGet.description, recipeGet.imagePath);
    //this.recipe=this.recipeService.getRecipe();

    //To get the parameters from the url
    //this.route.params.subscribe(arg =>console.log(arg)
    //  );
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }



  addProductToShoppingList(){
    this.shoppingService.addIngredients(this.recipeSelected.ingredients);
    //this.shoppingService.changeIngredients.emit(this.ingredients);
    this._router.navigate(['shopping/new'])
  }
  deleteRecipe(){
    this.recipeService.deleteRecipeById(this.index);
    this._router.navigate(['/home']);
  }






}
