import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  intervalFired= new EventEmitter<number>();
  interval;
  lastNumber:number=0;
  constructor() { }

onStartGame() {
  this.interval= setInterval(() => {
    this.lastNumber++;
    console.log(this.lastNumber);
    this.intervalFired.emit(this.lastNumber);
  }, 1000);
}
onPauseGame() {
  clearInterval(this.interval);
  }
}
