/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { provideStore } from '@ngrx/store';
import { counterReducerFunction } from './counter/store/counter.reducer';
import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { CounterComponent } from './counter/counter.component';


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

platformBrowser().bootstrapModule(AppModule).catch(err => console.error(err));


//bootstrapApplication(CounterComponent, { providers: [provideStore({ counter: counterReducerFunction })]});


