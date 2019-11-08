import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  inicioJuego: boolean = false;

  jugadores;

  constructor(private webSocket: WebsocketService, private api: ApiService,) { }

  ngOnInit() {

    this.api.getJugadores().subscribe((jugadores) => {
      this.jugadores = jugadores;
    })

    this.webSocket.listen('entrarSala').subscribe((data) => {
      this.jugadores.push(data);
    })

    this.webSocket.listen('salirSala').subscribe((idJugador) => {
      // Busco el jugador que se fue por ID y lo elimino de la lista.
      this.jugadores.splice(this.jugadores.findIndex(j => j.idJugador == idJugador), 1);
    })

    // Evento que se dispara cuando un juego fue inicializado
    this.webSocket.listen('inicioJuego').subscribe((idJuego) => {
      this.inicioJuego = true;
    })
  }

}
