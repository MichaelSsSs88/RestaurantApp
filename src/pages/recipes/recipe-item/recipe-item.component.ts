import { Component, Input } from '@angular/core';
import { recipe } from '../recipe.model';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {


   @Input() name:string;
   @Input() description:string;
   @Input() imagePath:string;

   constructor() {
   }

}
