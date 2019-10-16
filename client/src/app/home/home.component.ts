import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WebsocketService } from '../websocket.service';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  entroASala: boolean = false;  // Flag para saber si entro o no a la sala
  inicio: boolean = false;
  nombreJugador: String;
  alerta: boolean = false;
  jugadorForm;  // Form del jugador
  preguntas = [];
  preguntaActual;
  idPreguntaActual: number;
  tiempo: number = 30;

  respuestas;

  colores = ['#007aff' , '#28a745' , '#dc3545' , '#ffc107'];

  constructor(
    private webSocket: WebsocketService,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.jugadorForm = this.formBuilder.group({
      nombre: ''
    });
  }

  ngOnInit() {
    this.webSocket.listen('alerta').subscribe((data) => {
      this.alerta = true;
    })
    this.webSocket.listen('inicioJuego').subscribe((idJuego) => {

      // Si el jugador ya esta dentro de la sala entonces cargo todas las preguntas
      if(this.entroASala) {
        this.inicio = true;
        this.api.getPreguntasPorJuego(idJuego).subscribe((data) => {
          this.preguntas = data;
          this.preguntaActual = this.preguntas[0];
          this.respuestas = this.api.getRespuestasPorPregunta(this.preguntaActual.idPregunta);
          this.idPreguntaActual = 0;
          this.empezarTiempo();
        })
      }
      
    })
  }

  empezarTiempo() {
    setInterval(() => {
      if(this.tiempo > 0) {
        this.tiempo--;
      } else {
        this.idPreguntaActual++;
        this.preguntaActual = this.preguntas[this.idPreguntaActual];
        this.respuestas = this.api.getRespuestasPorPregunta(this.preguntaActual.idPregunta);
        this.tiempo = 30;
      }
    },1000)
  }

  entrarSala(jugador) {
    // La persona entra a la sala.
    this.webSocket.send('entrarSala' , jugador);
    this.nombreJugador = jugador.nombre;
    this.entroASala = true;
  }

}
