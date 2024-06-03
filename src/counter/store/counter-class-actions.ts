import { Action } from "@ngrx/store";

export const INCREMENT='[CounterReducerFn] increment';
export const DECREMENT='[CounterReducerFn] decrement';

export class IncrementAction implements Action {

  readonly type: string=INCREMENT;

  constructor(public value: number) {

  }
}

export class DecrementAction implements Action {

  readonly type: string=DECREMENT;

  constructor(public value: number) {

  }
}

export type CounterActions=IncrementAction|DecrementAction;
