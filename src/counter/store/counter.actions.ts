import { createAction, props } from "@ngrx/store";

export const increment = createAction(
  '[CounterReducerCons] increment',
  props<{value:number}>()
);

export const decrement = createAction(
  '[CounterReducerConst] decrement',
  props<{value:number}>()
);

export const incrementArrayFn = createAction(
  '[CounterReducerFn] increment',
  props<{value:number}>()
);

export const decrementArrayFn = createAction(
  '[CounterReducerFn] decrement',
  props<{value:number}>()
);

export const incrementSelector = createAction(
  '[CounterCalculate] increment',
  props<{value:number}>()
);

export const decrementSelector = createAction(
  '[CounterCalculate] decrement'
);

