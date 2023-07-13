import { RecipeComponent } from 'src/pages/recipes/recipe/recipe.component';
import { recipe } from './../recipe.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditComponent } from './recipe-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from 'src/services/recipe.service';

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterModule,RouterTestingModule,FormsModule,ReactiveFormsModule],
      declarations: [RecipeEditComponent]
    });
    fixture = TestBed.createComponent(RecipeEditComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be 4 recipes',()=>{
    fixture.detectChanges();

    const recipeComponent = fixture.componentInstance;
    //recipeComponent.index=1;
    fixture.detectChanges();
    console.log(recipeComponent.index);

    recipeComponent.index&&expect(recipeComponent.recipeSelected.name.length).toBeGreaterThan(0);
    !recipeComponent.index&&expect(recipeComponent.recipeSelected.name.length).toBe(0);
  })
});
