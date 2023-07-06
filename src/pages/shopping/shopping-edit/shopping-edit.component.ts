import { ChangeDetectorRef, Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShoppingService } from 'src/services/shopping.service';
import { ingredient } from 'src/shared/ingredient.model';




@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent{

  class_email: string = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
  class_quantity: string = "peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
  isFormReady: boolean = false;
  //@Output() addProduct = new EventEmitter();

  constructor(private cd: ChangeDetectorRef, private shoppingService:ShoppingService) { }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();//Take care, this help to solve issues about changes on the style change detection
  }

  signin: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, this.validateName]),
    quantity: new FormControl('', [Validators.required, this.validateQuantity]),
  });

  public register(): void {
    const user = this.signin.value;
    this.sendData(user.name, user.quantity);
    this.signin.reset();//.setValue({name:'', quantity:''})
    //this.signin.patchValue({name:'ready'})
    //this.signin.setValidators(Touch:)
  }

  sendData(name:string, quantity:number) {
    const data = {
      "name":name,
      "quantity":quantity,
    };
      this.shoppingService.addIngredient(new ingredient(name, quantity));
      //this.ingredients.push(new ingredient(data.name, data.quantity));
    //this.addProduct.emit(data);
  }

  // private validatePassword(control: AbstractControl):Object {
  //   const password = control.value;
  //   let error:Object= new Object();
  //   if (password!=""&&!password.includes('$')) {
  //     error = { ...error, dollar: 'needs a dollar symbol' };
  //   }
  //   if (password!=""&&!parseFloat(password[0])) {
  //     error = { ...error, number: 'must start with a number' };
  //    // class_email="peer-focus:font-medium absolute text-sm text-red-400 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-400 peer-focus:dark:text-red-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
  //   }
  //   if (password!=""&&password.length<6) {
  //     error = { ...error, length: 'It is required at least 6 characters' };
  //     //this.class_email="peer-focus:font-medium absolute text-sm text-red-400 dark:text-red-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-400 peer-focus:dark:text-red-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
  //   }
  //   return error;
  // }
  private validateName(control: AbstractControl): any[] {
    const name = control.value;
    let error: any[] = new Array<string>();
    if (name!=null&&name.trim().length < 6) {
      error.push("It is required at least 6 characters");
    } else if (name >= 6) {
      this.class_email = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
    }
    return error;
  }

  private validateQuantity(control: AbstractControl): Object {
    console.log("Aqui ando")
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


  public getError(controlName: string): any[] {
    let error = [];
    const control = this.signin.get(controlName);
    if (control != null && control.touched && control.errors != null) {
      Array.of(control.errors).forEach(errorGot=>{error.push(errorGot[0])})


      //error.push(JSON.stringify(control.errors));
      if (controlName == "name") {
        this.class_email = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-red-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
        return error;
      }
      if (controlName == "quantity") {
        this.class_quantity = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-red-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
        return error;
      }
    }
    else if(this.signin.get("quantity").errors==null&&this.signin.get("name").errors==null){
      this.isFormReady=true;
    }else{
      this.isFormReady=false;
    }
    controlName=="name"&&(this.class_email = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6");
    controlName=="quantity"&&(this.class_quantity="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6");

    return error;
  }

}
