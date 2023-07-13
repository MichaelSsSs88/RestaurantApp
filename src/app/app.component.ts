import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services/account.service';
import { ShoppingService } from 'src/services/shopping.service';
import { ingredient } from 'src/shared/ingredient.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //providers:[AccountService]
})
export class AppComponent implements OnInit {
  title = 'RestaurantApp';

  accounts:{name:string,status:string}[] = [];
  ingredients:ingredient[]=[];

  constructor(private accountService:AccountService, private shoppingService:ShoppingService) {
    //Method to manage event emitter in other way
    this.shoppingService.changeIngredients.subscribe((ingredients:ingredient[]) => {this.ingredients = ingredients});
    this.accountService.statusUpdated.subscribe((result:{id:number,status: string}) => {
      alert('Account updated successfully, id'+ result.id+ 'with status: ' + result.status)
    });
  }
  ngOnInit(): void {
    this.ingredients=this.shoppingService.ingredients;
    this.accounts=this.accountService.accounts;
  }

  // onAccountAdded(newAccount: {name: string, status: string}) {
  //   this.accountService.onAccountAdded(newAccount);
  //   this.accounts=this.accountService.accounts;
  //   //this.accounts.push(newAccount);
  // }

  // onStatusChanged(updateInfo: {id: number, newStatus: string}) {
  //   console.log(updateInfo);
  //   this.accountService.onStatusChanged(updateInfo);
  //   this.accounts=this.accountService.accounts;
  //   //this.accounts[updateInfo.id].status = updateInfo.newStatus;
  // }
}
