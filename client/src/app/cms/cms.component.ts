import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as io from 'socket.io-client';
import { WebsocketService } from '../websocket.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})

export class CmsComponent implements OnInit {
  mensaje: string;
  jugadores = [];

  constructor(private webSocket: WebsocketService, private api: ApiService) { }

  ngOnInit() {
    this.webSocket.listen('entrarSala').subscribe((data) => {
      this.jugadores.push(data);
    })
    this.webSocket.listen('salirSala').subscribe((idJugador) => {
      // Busco el jugador que se fue por ID y lo elimino de la lista.
      this.jugadores.splice(this.jugadores.findIndex(j => j.idJugador == idJugador), 1);
    })
    this.api.getJugadores().subscribe((res) => {
      this.cargarJugadores(res);
    });
  }

  cargarJugadores(res) {
    for(let i = 0; i < res.length; i++) {
      this.jugadores.push(res[i]);
    }
  }

  alertar() {
    this.webSocket.send('alertar');
  }

}
