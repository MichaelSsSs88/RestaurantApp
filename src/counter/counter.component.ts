import { state } from '@angular/animations';
import { increment, decrement, incrementArrayFn, decrementArrayFn, incrementSelector, decrementSelector } from './store/counter.actions';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DecrementAction, IncrementAction } from './store/counter-class-actions';
import { selectCount, selectDoubleCount } from './store/counter.selector';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  standalone:false,
  styleUrls: ['./counter.component.css']
})

export class CounterComponent {
  counterReducerFn: Observable<number>;
  counterReducerConst: Observable<number>;
  counterSelector: Observable<number>;
  doubleCounterSelector: Observable<number>;


  constructor(private store:Store<{counterReducerFn:number,counterReducerConst:number, counter:number}>){
    this.counterReducerFn=store.select('counterReducerFn');
    this.counterReducerConst=store.select('counterReducerConst');
    this.counterSelector=store.select(selectCount);
    this.doubleCounterSelector=store.select(selectDoubleCount);
  }

  increment(){
    this.store.dispatch(increment({value:5}));
  }

  decrement(){
    this.store.dispatch(decrement({value:1}));
  }

  incrementReducerFn(){
    //this.store.dispatch(incrementArrayFn({value:5})); //Without use counter class just using counter function
    this.store.dispatch(new IncrementAction(5));
  }

  decrementReducerFn(){
     //this.store.dispatch(decrementArrayFn({value:5}));
     this.store.dispatch(new DecrementAction(5));
  }

  incrementSelector(){
    //this.store.dispatch(incrementArrayFn({value:5})); //Without use counter class just using counter function
    this.store.dispatch(incrementSelector({value:1}));
  }

  decrementSelector(){
     //this.store.dispatch(decrementArrayFn({value:5}));
     this.store.dispatch(decrementSelector());
  }



}
