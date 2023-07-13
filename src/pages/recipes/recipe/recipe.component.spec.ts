import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeComponent } from './recipe.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterPipe } from 'src/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterModule,RouterTestingModule,FormsModule],
      declarations: [RecipeComponent, RecipeListComponent,FilterPipe]
    });
    fixture = TestBed.createComponent(RecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
