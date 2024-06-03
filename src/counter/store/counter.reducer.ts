import {Action, createReducer, on } from "@ngrx/store";
import { decrement, increment } from "./counter.actions";
import { CounterActions, DECREMENT, DecrementAction, INCREMENT, IncrementAction } from "./counter-class-actions";


const initialState=0;

const stateReducerConst=0;
export const counterReducerConst= createReducer(
  stateReducerConst,
  //on(increment,(state)=>state+1),
  on(increment,(state,action)=>state+action.value),
  on(decrement,(state)=>state-1)

  );

  const counter=0;
export const CounterCalculate= createReducer(
  counter,
  //on(increment,(state)=>state+1),
  on(increment,(state,action)=>state+action.value),
  on(decrement,(state)=>state-1)
)

 //Method use used without class
// export const counterReducerArrayFunction=(state=initialState, action:any)=>{
//   if(action.type==='[CounterReducerFn] increment'){
//     return state+action.value;
//   }
//   if(action.type==='[CounterReducerFn] decrement'){
//     return state-action.value;
//   }
//   return state;
// }

//Method use when you are using classes to manage the action
export const counterReducerArrayFunction=(state=initialState, action:CounterActions | Action)=>{
  if(action.type===INCREMENT){
    return state+(action as IncrementAction).value;
  }
  if(action.type===DECREMENT){
    return state-(action as DecrementAction).value;
  }
  return state;
}

export function counterReducerFunction(state=initialState){
  return state;
}

