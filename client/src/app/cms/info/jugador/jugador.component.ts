import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.scss']
})
export class JugadorComponent implements OnInit {

  @Input()
  jugador

  @Input()
  inicioJuego

  progreso: Number;
  modo: String; // Modo de la barra de progreso

  preguntasTotales: number;

  constructor(private webSocket: WebsocketService) { }

  ngOnInit() {
    this.modo = 'indeterminate';
    this.jugador.preguntaActual = 0;
    this.webSocket.listen('pasoPregunta').subscribe(
      (res) => {
        if(res.idJugador == this.jugador.idJugador) {
          this.actualizarJugador(res);
        }
      }
    )
    this.webSocket.listen('inicioJuego').subscribe(
      (res) => {
        this.preguntasTotales = res.cantPreguntas;
        this.progreso = 0;
        this.modo = 'determinate';
      }
    )
  }

  actualizarJugador(actualizacion) {
    this.jugador.puntaje = actualizacion.puntaje
    this.jugador.preguntaActual = actualizacion.preguntaActual;
    this.progreso = (this.jugador.preguntaActual/this.preguntasTotales)*100;
  }

  expulsarJugador() {
    this.webSocket.send('expulsarJugador' , this.jugador);
  }

}
