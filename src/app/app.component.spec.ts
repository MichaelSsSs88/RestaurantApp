import {HttpClientTestingModule} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from 'src/components/navbar/navbar.component';

describe('AppComponent', () => {


  //TestBed: Pertenece a Angular no a Jasmine
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientTestingModule],
    declarations: [AppComponent, NavbarComponent
    ]
  })
  );

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent, NavbarComponent
      ]
    })
  });




  // beforeEach(() => TestBed.configureTestingModule({
  //   imports: [RouterTestingModule, HttpClientTestingModule],
  //   declarations: [AppComponent, NavbarComponent
  //   ]
  // }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'RestaurantApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.title).toEqual('RestaurantApp');
  });
  it(`should has 12 ingredients`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.ingredients.length).toEqual(12);
  });

  /*it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('RestaurantApp app is running!');
  });*/
});
