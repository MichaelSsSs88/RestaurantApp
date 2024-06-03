import { ingredient } from "src/shared/ingredient.model";

export interface IRecipe{
   id:string;
   name:string;
   description:string;
   imagePath:string;
   ingredients:ingredient[];

  get getId() : string;
  set setId(v : string);
  get _name(): string ;
  set _name(value: string);
  get _imagePath(): string;
  set _imagePath(value: string);
  get _description(): string ;
  set _description(value: string);
  get _ingredients(): ingredient[];
  set _ingredients(value: ingredient[]);
}
