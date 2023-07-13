import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListComponent } from './recipe-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FilterPipe } from 'src/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { RecipeService } from 'src/services/recipe.service';
import { recipe } from '../recipe.model';
import { ingredient } from 'src/shared/ingredient.model';
import { HttpClient } from '@angular/common/http';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let recipeService: RecipeService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  let fakeRecipeService: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule],
      declarations: [RecipeListComponent,FilterPipe],
      providers: [RecipeService]
    });
    fixture = TestBed.createComponent(RecipeListComponent);
    recipeService= TestBed.inject(RecipeService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be loaded', () => {
    expect(component).toBeTruthy();
  });

  it('data should be gotten for the service', () => {
    const response=httpMock.expectOne('https://restaurant-app-a3c2e-default-rtdb.firebaseio.com/recipe.json');
    fixture.detectChanges();
    expect(response.request.method).toBe('GET');
  })

  it('connection to the service should be established', () => {
    recipeService.recipeList = new Array<recipe>();
    recipeService.recipeList.push(new recipe('0', "Sauce meatrt", "It is an exquisite meat prepare with tomato sauce and  vegetables", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-t4wO8vHKj6P7VpzxjgrZeBbO-pAFv2YBQ&usqp=CAU", new Array<ingredient>(new ingredient('avocado', 10))));
    const service = fixture.debugElement.injector.get(RecipeService);
    expect(service.getRecipes().length).toEqual(1);
  })
});
