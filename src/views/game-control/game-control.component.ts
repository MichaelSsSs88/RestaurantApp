import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { timeout } from 'rxjs';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit{

  lastNumber:number;
  constructor(private gameService:GameService) {


  }
  ngOnInit(): void {
    this.lastNumber= this.gameService.lastNumber;
  }




onStartGame() {
  this.gameService.onStartGame();
  // this.interval= setInterval(() => {
  //   this.lastNumber++;
  //   this.intervalFired.emit(this.lastNumber);
  // }, 1000);
}
onPauseGame() {
  this.gameService.onPauseGame();
  }

}
