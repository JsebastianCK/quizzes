import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { WebsocketService } from '../websocket.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  mensaje: string;
  jugadores;
  preguntas;

  constructor(private webSocket: WebsocketService, private api: ApiService) { }

  ngOnInit() {
    this.webSocket.listen('entrarSala').subscribe((data) => {
      this.jugadores.push(data);
    })
    this.preguntas = this.api.getPreguntas();
    this.jugadores = this.api.getJugadores();
  }

  alertar() {
    this.webSocket.send('alertar');
  }

}
