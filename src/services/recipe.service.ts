import { Router } from '@angular/router';
import { recipe } from './../pages/recipes/recipe.model';
import { ingredient } from 'src/shared/ingredient.model';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Subject, exhaustMap, map, take, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from 'src/pages/auth/user.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  recipeList: recipe[];
  recipeSelected: recipe;
  user:User=null;

  //recipeSelectedEvent= new EventEmitter<recipe>();
  errorMessage = new Subject<string>();
  recipeSelectedEvent = new Subject<recipe>();
  recipeListChanged = new Subject<recipe[]>();
  constructor(private http: HttpClient, private router: Router, private authenticationService: AuthenticationService) {
    this.recipeList = new Array<recipe>();
    //this.authenticationService.autoSingUp();
    //this.authenticationService.autoSingUp();
    this.authenticationService.userT.subscribe((user:User) =>{
      this.user= user;
     this.user&&this.getData();
     // alert(this.recipeList.length)
  });
  //this.getData();
    //this.recipeList.push(new recipe("","Chicken Rice","It is an exquisite rice prepare with chicken","https://assets.unileversolutions.com/recipes-v2/216417.jpg",new Array<ingredient>(new ingredient('potato',5))));
    //this.recipeList.push(new recipe("","Pork Rice","It is an exquisite rice prepare with pork","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmAHSaMatiUQP66fp8s5zqz9oxMC512X1ZAA&usqp=CAU", new Array<ingredient>(new ingredient('rice',50))));
    //this.recipeList.push(new recipe("","Sauce meat","It is an exquisite meat prepare with tomato sauce and  vegetables","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-t4wO8vHKj6P7VpzxjgrZeBbO-pAFv2YBQ&usqp=CAU",new Array<ingredient>(new ingredient('avocado',10))));
  }


  getData(): void {

    this.recipeList = new Array<recipe>();
    //this.authenticationService.user.pipe(take(1)).subscribe(user => {})

    // this.authenticationService.userT.pipe(take(1),
    //                                     exhaustMap(user => { return this.http.get("https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json",
    //                                                                               {params: new HttpParams().set('auth',user.getToken())}
    //                                     ) }),
    //                                     tap(recipes=>{
    //                                       Object.entries(recipes).map(recipeItem =>{
    //                                         this.recipeList.push(new recipe(recipeItem[0], recipeItem[1].name, recipeItem[1].description, recipeItem[1].imagePath, recipeItem[1].ingredients ? recipeItem[1].ingredients : []));
    //                                         console.log(this.recipeList);

    //                                       })
    //                                     })
    // )

    //let userLoaded:User=JSON.parse(this.cookieService.get('userAdded'));
    //console.log(userLoaded);
    //this.userT.next(userLoaded);



    this.http.get("https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json"
                //,{params: new HttpParams().set('auth',this.user.getToken())}
    )
      .subscribe({
        next: (recipes) => {
          Object.entries(recipes).forEach((recipeItem) => {
            this.recipeList.push(new recipe(recipeItem[0], recipeItem[1].name, recipeItem[1].description, recipeItem[1].imagePath, recipeItem[1].ingredients ? recipeItem[1].ingredients : []));
          });
          this.recipeListChanged.next(this.recipeList.slice());
        },
        error: (error) => {
          this.errorMessage.next(error.message);
          //this.router.navigate(['/login']);
        },
        complete: () => console.info('complete')
      });
  }




  selectRecipe = (recipeGet: recipe) => {
  }

  getRecipe = () => {
    return this.recipeSelected;
  }

  getRecipes = () => {
    return this.recipeList;
  }
  getRecipeById = (id: number) => {
    return this.recipeList[id];
  }

  deleteRecipeById = (id: number) => {
    this.http.delete(`https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe/${this.getRecipeById(id).id}.json`).subscribe((result) => {
      this.getData();
    })
  }
  addRecipe(recipeNew: recipe) {
    this.http.post("https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json", {
      name: recipeNew.name,
      description: recipeNew.description,
      imagePath: recipeNew.imagePath,
      ingredients: recipeNew.ingredients
    },{params: new HttpParams().set('auth',this.user.getToken())}).subscribe((recipes) => {
      this.getData();
    }, error => {
      this.errorMessage.next(error.message);
    });
  }
  updateRecipe = (id: number, recipeUpdated: recipe) => {
    this.http.patch(`https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe/${this.getRecipeById(id).id}.json`, {
      name: recipeUpdated.name,
      description: recipeUpdated.description,
      imagePath: recipeUpdated.imagePath,
      ingredients: recipeUpdated.ingredients
    }).subscribe((result) => {
      this.getData();
      //this.recipeListChanged.next(this.recipeList.slice());
    }, error => {
      this.errorMessage.next(error.message);
    })
  }

}
