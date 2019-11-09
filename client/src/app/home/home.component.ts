import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WebsocketService } from '../websocket.service';
import { ApiService } from '../api.service';
import { DomSanitizer } from '@angular/platform-browser';


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
  intervalo;
  termino: boolean = false;
  
  tiempo: number;
  tiempoTranscurrido: number = this.tiempo;

  respuestas;
  preguntaRespondida: boolean = false;
  respuestaCorrecta: boolean = false;

  // Check si el jugador fue expulsado o no de la sala.
  expulsado: boolean = false;

  configuracion: any;

  colores = ['#007aff' , '#28a745' , '#dc3545' , '#ffc107'];

  constructor(
    private webSocket: WebsocketService,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private domSanitizer: DomSanitizer
  ) {
    this.jugadorForm = this.formBuilder.group({
      nombre: ''
    });
    
  }

  ngOnInit() {
    this.webSocket.listen('alerta').subscribe((data) => {
      this.alerta = true;
    })
    this.webSocket.listen('expulsado').subscribe(() => {
      this.expulsado = true;
    })

    this.api.getConfiguracion().subscribe(
      (res) => {
        this.configuracion = res[0];
        this.tiempo = this.configuracion.tiempoPregunta
      }
    )

    this.webSocket.listen('inicioJuego').subscribe((juego) => {

      // Si el jugador ya esta dentro de la sala entonces cargo todas las preguntas
      if(this.entroASala) {
        this.termino = false;
        this.inicio = true;
        this.puntaje = 0;
        this.tiempoTranscurrido = this.tiempo;
        this.api.getPreguntasPorJuego(juego.idJuego).subscribe((data) => {
          this.preguntas = data;
          this.preguntas.forEach(pregunta => {
            if(pregunta.imagen != null) {
              let TYPED_ARRAY = new Uint8Array(pregunta.imagen.data);
              const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {return data + String.fromCharCode(byte);}, '');
              let base64String = btoa(STRING_CHAR);
              let url = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
              pregunta.url = url;
            }
          })
          this.preguntasTotales = this.preguntas.length;
          this.preguntaActual = this.preguntas[0];
          this.respuestas = this.api.getRespuestasPorPregunta(this.preguntaActual.idPregunta);
          this.idPreguntaActual = 0;
          this.empezarTiempo();
        })
      }
      
    });

  }
  // Cuando se hace click en alguna respuesta se llama a esta funcion.
  // Entra por parametro si la respuesta elegida es correcta o no.
  responderPregunta(correcta) {
    this.preguntaRespondida = true;
    clearInterval(this.intervalo);

    if(correcta == 1){

      this.respuestaCorrecta = true;
      this.puntaje += 10 + this.tiempoTranscurrido;
      this.api.updatePuntaje({
        nombreJugador: this.nombreJugador,
        puntaje: this.puntaje
      }).subscribe((res) => {
        console.log(res)
      });
      
    }

    setTimeout(()=>{
        this.siguientePregunta();
    },2000);



  }

  // Empieza el tiempo
  empezarTiempo() {
    this.intervalo = setInterval(() => {
      if(this.tiempoTranscurrido > 0) {
        this.tiempoTranscurrido--;
      } else {

        this.siguientePregunta();
      }
    },1000);
  }

  // La persona entra a la sala.
  entrarSala(jugador) {
    jugador.puntaje = 0;
    this.webSocket.send('entrarSala' , jugador);
    this.nombreJugador = jugador.nombre;
    this.entroASala = true;
  }

  // Pasa a la siguiente pregunta
  siguientePregunta() {
    this.idPreguntaActual++;
    if(this.idPreguntaActual == this.preguntasTotales) {
      this.termino = true;
    } else {
      this.preguntaRespondida = false;
      this.respuestaCorrecta = false
      this.preguntaActual = this.preguntas[this.idPreguntaActual];
      this.respuestas = this.api.getRespuestasPorPregunta(this.preguntaActual.idPregunta);
      this.tiempoTranscurrido = this.tiempo;
      this.empezarTiempo();
    }
    this.webSocket.send('pasoPregunta' , {
      nombre: this.nombreJugador,
      preguntaActual: this.idPreguntaActual,
      puntaje: this.puntaje
    });

  }

}
