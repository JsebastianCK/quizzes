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

    // Evento que se dispara cuando un jugador pasa a la siguiente pregunta
    this.webSocket.listen('pasoPregunta').subscribe((jugador) => {
      
    })

    // Evento que se dispara cuando un juego fue inicializado
    this.webSocket.listen('inicioJuego').subscribe((idJuego) => {
      this.inicioJuego = true;
    })
  }

}
