import { ingredient } from './../../shared/ingredient.model';
export class recipe {
  public id:string;
  public name:string;
  public description:string;
  public imagePath:string;
  public ingredients:ingredient[]= [];



  constructor(id:string,name:string, description:string, imagePath:string, ingredients:ingredient[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }

}
