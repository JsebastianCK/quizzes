import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  mensaje: string;
  jugadores: string[] = [];

  constructor(private webSocket: WebsocketService) { }

  ngOnInit() {
    this.webSocket.listen('entrarSala').subscribe((data) => {
      this.jugadores.push(data);
    })
  }

  alertar() {
    this.webSocket.send('alertar');
  }

}
