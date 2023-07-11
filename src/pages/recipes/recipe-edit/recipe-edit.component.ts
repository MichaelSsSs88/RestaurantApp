import { ingredient } from './../../../shared/ingredient.model';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { RecipeService } from 'src/services/recipe.service';
import { recipe } from '../recipe.model';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy{
  public subscriber: Subscription;
  index:number;
  ingredientId:number=null;
  ingredient:ingredient=null;
  recipeSelected:recipe;
  recipeForm: FormGroup;
  signin: FormGroup;
  class_quantity: string = "peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
  isFormReady: boolean = false;
  class_email: string = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600" ;
  class_ingredient: string = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600" ;
  class_name: string = "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  class_description: string = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600";
  class_description_input="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-2";

  constructor(private cd: ChangeDetectorRef, private router: Router,private route:ActivatedRoute,private recipeService: RecipeService){

    this.subscriber = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.index=this.route.snapshot.params['id'];
      this.index?this.recipeSelected = this.recipeService.getRecipeById(this.index):this.recipeSelected= new recipe("","","","",new Array<ingredient>());
    });
    this.signin= new FormGroup({
      name_ingredient: new FormControl('', [Validators.required, this.validateName]),
      quantity: new FormControl('', [Validators.required, this.validateQuantity]),
    });
    this.recipeForm= new FormGroup({
      imagePath: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, this.validateName]),
      description: new FormControl('',[Validators.required,this.validateDescription]),
      //ingredients: new FormArray([]),
    });

    //this.subscriber.unsubscribe();
  }

  ngOnInit(): void {

    this.index?this.recipeSelected = this.recipeService.getRecipeById(this.index):this.recipeSelected= new recipe("","","","",new Array<ingredient>());
   // this.recipeSelected = this.recipeService.getRecipeById(this.index);
    this.recipeSelected&&this.recipeForm.patchValue({name:this.recipeSelected.name})
    this.recipeSelected&&this.recipeForm.patchValue({description:this.recipeSelected.description})
    this.recipeSelected&&this.recipeForm.patchValue({imagePath:this.recipeSelected.imagePath})
    this.ingredient&&this.signin&&this.signin.setValue({name_ingredient:this.ingredient.name, quantity:this.ingredient.amount});
   // this.recipeForm.value.ingredients.push(this.recipeSelected.ingredients);
    //this.recipeSelected&&this.recipeForm.patchValue({ingredients:this.recipeSelected.ingredients});
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();//Take care, this help to solve issues about changes on the style change detection
  }

  onSubmit():void{
    this.recipeSelected.name=this.recipeForm.value.name;
    this.recipeSelected.description=this.recipeForm.value.description;
    this.recipeSelected.imagePath=this.recipeForm.value.imagePath;
    this.index?this.recipeService.updateRecipe(this.index,this.recipeSelected):this.recipeService.addRecipe(this.recipeSelected);
    this.recipeForm.reset();
    this.ingredientId=null;
    this.ingredient=null;
    this.recipeSelected= new recipe("","","","",new Array<ingredient>());
    this.index&&this.router.navigate(['/home']);
    //this.router.navigate(['/home']);
    //console.log("Este: " +this.recipeForm.value.name);
    //console.log("Este: " +this.recipeForm.value.description);
    //console.log("Este: " +this.recipeForm.value.imagePath);
    ///console.log(this.recipeSelected);

  }

  updateIngredient(id:number):void {
    this.ingredientId=id;
    this.ingredient= this.recipeSelected.ingredients[id];
    console.log(this.ingredient)
    this.signin&&this.signin.setValue({name_ingredient:this.ingredient.name, quantity:this.ingredient.amount});
  }

  saveIngredient(){
    if(this.ingredientId!=null){
        console.log(this.ingredientId +" "+this.ingredient.name);
        this.recipeSelected.ingredients[this.ingredientId].name=this.signin.value.name_ingredient;
        this.recipeSelected.ingredients[this.ingredientId].amount=this.signin.value.quantity;
        this.ingredientId=null;
        this.signin.reset();
    }else{
      console.log(this.recipeSelected);

      this.recipeSelected.ingredients.push(new ingredient(this.signin.value.name_ingredient,this.signin.value.quantity));
      this.signin.reset();
      this.alertConfirmation();
    }
  }

  deleteIngredient(id:number):void{
    this.recipeSelected.ingredients=this.recipeSelected.ingredients.filter((item,index)=>{
      if(id!=index){return item};
    })//.splice(id, id-1);
  }

  validateName(control: AbstractControl): any[] {
    const value=control.value;
    let errors:any[]=new Array();
    if(value!==null && value.trim().length<6){
      errors.push('Please enter a valid name. At least 6 characters');
    }
    return errors;
  }

  private validateQuantity(control: AbstractControl): Object {
    let error: any[] = new Array<string>();
    try {
      const quantity:number = control.value;
      if(quantity==null){
        error.push('It is required a number');
      }
      if (quantity<0) {
        error.push('Quantity has to be up of 0');
      }
    } catch (error) {
        error.push('It is required a number');
    }

    return error;
  }

  validateDescription(control: AbstractControl): any[] {
    const value=control.value;
    let errors:any[]=new Array();
    if(value!==null && value.trim().length<10){
      errors.push('Please enter a valid description. At least 10 characters');
    }
    return errors;
  }

  showError(controlName:string):any[]{
    let error:any[]=new Array<string>();
    const value= this.recipeForm.get(controlName);
    if(value!=null&&!value.valid &&value.touched){
      Object.values(value.errors).forEach(err=>{
        error.push(err);
        console.log(err);
      });

      if (controlName == "name") {
        this.class_email = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-red-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600 peer-focus:border-red-600";
        this.class_name="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-600 appearance-none dark:text-white dark:border-red-600 dark:focus:border-red-600 focus:outline-none focus:ring-0 focus:border-red-600 peer";
        return error;
      }
      if (controlName == "description") {
        this.class_description = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-red-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 dark:focus:border-red-600 dark:border-red-600";
        this.class_description_input="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-red-600 dark:focus:border-red-600 focus:outline-none focus:ring-0 focus:border-red-600 peer mt-2";

        return error;
      }
    }
    controlName=="name"&&(this.class_email = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
                          this.class_name= "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer");
    controlName=="description"&&(this.class_description = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
                          this.class_description_input="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-2"
    );
    return error;
  }

  public getError(controlName: string): any[] {
    let error = [];
    const control = this.signin.get(controlName);
    if (control != null && control.touched && control.errors != null) {
      Array.of(control.errors).forEach(errorGot=>{error.push(errorGot[0])})


      //error.push(JSON.stringify(control.errors));
      if (controlName == "name_ingredient") {
        this.class_ingredient = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-red-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
        return error;
      }
      if (controlName == "quantity") {
        this.class_quantity = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-red-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
        return error;
      }
    }
    else if(this.signin.get("quantity").errors==null&&this.signin.get("name_ingredient").errors==null){
      this.isFormReady=true;
    }else{
      this.isFormReady=false;
    }
    controlName=="name_ingredient"&&(this.class_ingredient = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6");
    controlName=="quantity"&&(this.class_quantity="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6");

    return error;
  }

  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }







}
