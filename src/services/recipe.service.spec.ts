import { TestBed } from '@angular/core/testing';

import { RecipeService } from './recipe.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { recipe } from 'src/views/recipes/recipe.model';
import { ingredient } from 'src/shared/ingredient.model';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
}

describe('RecipeService', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RecipeService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);


  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('firebase should be called to get the data', () => {

    httpClient.get('https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json')
      .subscribe(data =>
      // When observable resolves, result should match test data
      {
        expect(data).toEqual(new recipe('0', "Sauce meatrt", "It is an exquisite meat prepare with tomato sauce and  vegetables", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-t4wO8vHKj6P7VpzxjgrZeBbO-pAFv2YBQ&usqp=CAU", new Array<ingredient>(new ingredient('avocado', 10))))
      }
      );
    const request = httpMock.match("https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json");
    request[1].flush(new recipe('0', "Sauce meatrt", "It is an exquisite meat prepare with tomato sauce and  vegetables", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-t4wO8vHKj6P7VpzxjgrZeBbO-pAFv2YBQ&usqp=CAU", new Array<ingredient>(new ingredient('avocado', 10))));
    expect(request[1].request.method).toEqual('GET');
    httpMock.verify();
  })

  it('should be updated the recipe by id', () => {
    let id: number = 0;
    service.recipeList = new Array<recipe>();
    service.recipeList.push(new recipe('0', "Sauce meatrt", "It is an exquisite meat prepare with tomato sauce and  vegetables", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-t4wO8vHKj6P7VpzxjgrZeBbO-pAFv2YBQ&usqp=CAU", new Array<ingredient>(new ingredient('avocado', 10))));
    service.updateRecipe(0, new recipe("", "Sauce meat", "It is an exquisite meat prepare with tomato sauce and  vegetables", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-t4wO8vHKj6P7VpzxjgrZeBbO-pAFv2YBQ&usqp=CAU", new Array<ingredient>(new ingredient('avocado', 10))));
    const request = httpMock.expectOne(`https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe/${id}.json`);
    const requestData = httpMock.expectOne("https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json");
    expect(request.request.method).toEqual('PATCH');
    expect(requestData.request.method).toEqual('GET');
  })

  it('should be deleted the recipe by id', () => {
    let id: number = 0;
    service.recipeList = new Array<recipe>();
    service.recipeList.push(new recipe('0', "Sauce meatrt", "It is an exquisite meat prepare with tomato sauce and  vegetables", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-t4wO8vHKj6P7VpzxjgrZeBbO-pAFv2YBQ&usqp=CAU", new Array<ingredient>(new ingredient('avocado', 10))));
    service.deleteRecipeById(0);
    const request = httpMock.expectOne(`https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe/${id}.json`);
    const requestData = httpMock.expectOne("https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json");
    expect(request.request.method).toEqual('DELETE');
    expect(requestData.request.method).toEqual('GET');
  })

  it('should be added a new recipe', () => {
    service.recipeList = new Array<recipe>();
    service.addRecipe(new recipe('0', "Sauce meatrt", "It is an exquisite meat prepare with tomato sauce and  vegetables", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-t4wO8vHKj6P7VpzxjgrZeBbO-pAFv2YBQ&usqp=CAU", new Array<ingredient>(new ingredient('avocado', 10))));
    const request = httpMock.match(`https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json`);
    expect(request[0].request.method).toEqual('GET');
    expect(request[1].request.method).toEqual('POST')
  })
});
