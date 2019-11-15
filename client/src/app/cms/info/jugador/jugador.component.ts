import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';
import { ApiService } from 'src/app/api.service';

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
  modo: string; // Modo de la barra de progreso
  color: string;

  preguntasTotales: number;

  constructor(private webSocket: WebsocketService, private api: ApiService) { }

  ngOnInit() {
    this.color = 'primary';
    this.api.getJugador(this.jugador.idJugador).subscribe(
      (res) => {
        res = res[0];
        this.jugador.puntaje = res.puntaje;
        this.jugador.jugando = res.jugando;
        this.jugador.preguntaActual = res.preguntaActual
        this.modo = (this.jugador.jugando == 0) ? 'indeterminate' : 'determinate';
        this.jugador.termino = (this.jugador.jugando == -1);
        if(!this.jugador.termino) {
          this.api.getJuego(this.jugador.jugando).subscribe(
            (respuesta) => {
              respuesta = respuesta[0];
              this.preguntasTotales = respuesta.cantPreguntas;
              this.progreso = (this.jugador.preguntaActual/this.preguntasTotales)*100;
            }
          )
        } else {
          this.progreso = 100;
          this.color = 'accent';
        }

      }
    )
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
