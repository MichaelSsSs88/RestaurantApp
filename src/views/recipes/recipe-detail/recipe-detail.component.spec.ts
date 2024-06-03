import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailComponent } from './recipe-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeService } from 'src/services/recipe.service';
import { ShoppingService } from 'src/services/shopping.service';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      declarations: [RecipeDetailComponent],
      providers: [HttpClientTestingModule,RecipeService,ShoppingService]

    });
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should',()=>{
    const fixture = TestBed.createComponent(RecipeDetailComponent);
    fixture.detectChanges();
    const recipeDetail = fixture.componentInstance;
   fixture.detectChanges();
    console.log(recipeDetail.index);

  })
});
