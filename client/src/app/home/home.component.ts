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
  puntaje: number = 0;
  
  preguntas = [];
  preguntaActual;
  idPreguntaActual: number;
  preguntasTotales: number;
  termino: boolean = false;
  
  tiempo: number = 10;

  respuestas;
  preguntaRespondida: boolean = false;
  respuestaCorrecta: boolean = false;

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
        this.termino = false;
        this.inicio = true;
        this.api.getPreguntasPorJuego(idJuego).subscribe((data) => {
          this.preguntas = data;
          this.preguntasTotales = this.preguntas.length;
          this.preguntaActual = this.preguntas[0];
          this.respuestas = this.api.getRespuestasPorPregunta(this.preguntaActual.idPregunta);
          this.idPreguntaActual = 0;
          this.empezarTiempo();
        })
      }
      
    })
  }
  // Cuando se hace click en alguna respuesta se llama a esta funcion.
  // Entra por parametro si la respuesta elegida es correcta o no.
  responderPregunta(correcta) {
    this.preguntaRespondida = true;
    if(correcta == 1){
      this.idPreguntaActual++;
      this.puntaje += 10 + this.tiempo;
      this.api.updatePuntaje({
        nombreJugador: this.nombreJugador,
        puntaje: this.puntaje
      }).subscribe((res) => {
        console.log(res)
      });
      
    }
    setTimeout(()=>{
        this.siguientePregunta();

    },2000)

  }

  // Empieza el tiempo
  empezarTiempo() {
    setInterval(() => {
      if(this.tiempo > 0) {
        this.tiempo--;
      } else {
        this.idPreguntaActual++;
        if(this.idPreguntaActual != this.preguntasTotales) {
          this.siguientePregunta();
        } else {
          this.termino = true;
        }
      }
    },1000)
  }

  // La persona entra a la sala.
  entrarSala(jugador) {
    this.webSocket.send('entrarSala' , jugador);
    this.nombreJugador = jugador.nombre;
    this.entroASala = true;
  }

  // Pasa a la siguiente pregunta
  siguientePregunta() {
    this.preguntaRespondida = false;
    this.respuestaCorrecta = false
    this.preguntaActual = this.preguntas[this.idPreguntaActual];
    this.respuestas = this.api.getRespuestasPorPregunta(this.preguntaActual.idPregunta);
    this.tiempo = 30;
  }

}
