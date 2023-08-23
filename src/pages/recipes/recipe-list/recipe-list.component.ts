import { Router } from '@angular/router';
import { ingredient } from './../../../shared/ingredient.model';
import { recipe } from './../recipe.model';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';
import { Subscription, timeout } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  //@Output() miEvento = new EventEmitter();
  recipeList:recipe [];
  filteredStatus:string ='';
  errorSubscriber:Subscription;
  recipeSubscriber: Subscription;
  error:string = '';

  constructor(private recipeService: RecipeService, private router: Router, private authenttication: AuthenticationService){

    this.recipeSubscriber=this.recipeService.recipeListChanged.subscribe((recipeList) =>{
      this.recipeList =recipeList;
    })

  }

  ngOnInit(): void {
   // this.authentication.autoSingUp();
   this.authenttication.autoSingUp();
   this.recipeList =this.recipeService.recipeList;

    this.errorSubscriber=this.recipeService.errorMessage.subscribe(error =>{
      this.error=error;
      this.Toast.fire({
        icon: 'error',
        title: 'Bad connection to the server'
      })
  })


  }
  ngOnDestroy(): void {
   //this.recipeService.recipeListChanged.unsubscribe();
   //this.errorSubscriber.unsubscribe();
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

  Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


}
