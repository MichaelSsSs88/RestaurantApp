import { ingredient } from '../../shared/ingredient.model';
export class recipe {
  public id: string;
  public name: string;

  public description: string;

  public imagePath: string;

  public ingredients: ingredient[] = [];




  constructor(id: string, name: string, description: string, imagePath: string, ingredients: ingredient[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }

  public get getId() : string {
    return this.id;
  }

  public set setId(v : string) {
    this.id = v;
  }

  public get _name(): string {
    return this.name;
  }
  public set _name(value: string) {
    this.name = value;
  }
  public get _imagePath(): string {
    return this.imagePath;
  }
  public set _imagePath(value: string) {
    this.imagePath = value;
  }

  public get _description(): string {
    return this.description;
  }
  public set _description(value: string) {
    this.description = value;
  }
  public get _ingredients(): ingredient[] {
    return this.ingredients;
  }
  public set _ingredients(value: ingredient[]) {
    this.ingredients = value;
  }

}
