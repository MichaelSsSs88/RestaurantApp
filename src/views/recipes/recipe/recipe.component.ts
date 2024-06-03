import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';
import { recipe } from '../recipe.model';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit{

    //selectedRecipe:recipe;

    //@Output() name:string;
    //@Output() description:string;
    //@Output() imagePath:string;

    oddNumbers:number[] = [];
    evenNumbers:number[] =[];
  constructor(private gameService:GameService,){
    this.gameService.intervalFired.subscribe((newNumber:number)=>this.onIntervalFired(newNumber));

  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }


    // manejarEvento(data: any) {
    //   //this.name=data.name;
    //   //this.description=data.description;
    //   //this.imagePath=data.imagePath;
    //   console.log('Evento recibido:', data);
    //   this.recipeService.recipeSelectedEvent.emit(new recipe(this.name, this.description, this.imagePath));
    //   //this.recipeService.selectRecipe(new recipe(this.name, this.description, this.imagePath));
    // }
    onIntervalFired(firedNumber:number) {
      firedNumber % 2 === 0 ? this.evenNumbers.push(firedNumber):this.oddNumbers.push(firedNumber);
      }
x
      // postData(){

      //   this.recipeService.getRecipes().forEach(recipeAdded=>{
      //     this.http.post("https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json",recipeAdded).subscribe(responseData => {console.log(responseData)});
      //   })
      // }
}
