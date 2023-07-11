import { recipe } from './../pages/recipes/recipe.model';
import { ingredient } from 'src/shared/ingredient.model';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnInit{


  recipeList:recipe [];
  recipeSelected:recipe;
  //recipeSelectedEvent= new EventEmitter<recipe>();
  recipeSelectedEvent= new Subject<recipe>();
  recipeListChanged= new Subject<recipe[]>();
  constructor(private http: HttpClient){
    this.recipeList = new Array<recipe>();
    this.getData();
    //this.recipeList.push(new recipe("","Chicken Rice","It is an exquisite rice prepare with chicken","https://assets.unileversolutions.com/recipes-v2/216417.jpg",new Array<ingredient>(new ingredient('potato',5))));
    //this.recipeList.push(new recipe("","Pork Rice","It is an exquisite rice prepare with pork","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmAHSaMatiUQP66fp8s5zqz9oxMC512X1ZAA&usqp=CAU", new Array<ingredient>(new ingredient('rice',50))));
    //this.recipeList.push(new recipe("","Sauce meat","It is an exquisite meat prepare with tomato sauce and  vegetables","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-t4wO8vHKj6P7VpzxjgrZeBbO-pAFv2YBQ&usqp=CAU",new Array<ingredient>(new ingredient('avocado',10))));
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  getData():void{
    this.http.get("https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json").subscribe((recipes)=>{
      Object.entries(recipes).forEach((recipeItem)=>{
       // const newRecipe= recipeItem[0];
        this.recipeList.push(new recipe(recipeItem[0],recipeItem[1].name,recipeItem[1].description,recipeItem[1].imagePath,recipeItem[1].ingredients));

      });
      this.recipeListChanged.next(this.recipeList.slice());
    })
  }



  selectRecipe=(recipeGet:recipe)=>{
    //if(recipeGet!=null)this.recipeSelected= new recipe(recipeGet.name,recipeGet.description,recipeGet.imagePath);
  }

  getRecipe=()=>{
    return this.recipeSelected;
  }

  getRecipes=()=>{
    return this.recipeList;
  }
  getRecipeById=(id:number)=>{
    return this.recipeList[id];
  }

  deleteRecipeById=(id:number)=>{
    this.recipeList=this.recipeList.filter((recipe, index)=>{
        return (index!=id)&&recipe;
    });
    this.recipeListChanged.next(this.recipeList.slice());
  }
  addRecipe(recipeNew:recipe){
    this.http.post("https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json",{
      name:recipeNew.name,
      description:recipeNew.description,
      imagePath:recipeNew.imagePath,
      ingredients:recipeNew.ingredients
    }).subscribe((recipes)=>{
      Object.entries(recipes).forEach((recipeItem)=>{
        // const newRecipe= recipeItem[0];
        console.log(recipeItem)
         //this.recipeList.push(new recipe(recipeItem[0],recipeItem[1].name,recipeItem[1].description,recipeItem[1].imagePath,recipeItem[1].ingredients));
         //console.log(this.recipeList);
        this.getData();
       })
    });
    //this.recipeList.push(recipeNew);

    //this.http.post("https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json",this.recipeService.getRecipes()).subscribe(responseData => {console.log(responseData)});
  }
  updateRecipe=(id:number, recicpeUpdated:recipe)=>{
    this.recipeList[id]=recicpeUpdated;
    this.recipeListChanged.next(this.recipeList.slice());
  }

}
