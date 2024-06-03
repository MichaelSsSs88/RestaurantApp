import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { decrement, increment } from "./counter.actions";
import { tap, withLatestFrom } from "rxjs";

@Injectable()
export  class CounterEffects{
  saveCount= createEffect(()=>this.actions.pipe(
    ofType(increment, decrement),
    withLatestFrom(this.store.select('counterReducerConst')),
    tap(([action,counterReducerConst])=>{
      console.log(counterReducerConst);
      localStorage.setItem('counter',counterReducerConst.toString());

    }
  )),{dispatch:false});

  constructor(private actions:Actions, private store:Store<{counterReducerConst:number}>) {

  }
}
