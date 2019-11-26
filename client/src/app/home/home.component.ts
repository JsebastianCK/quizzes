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
  idJugador;
  alerta: boolean = false;
  jugadorForm;  // Form del jugador
  puntaje: number = 0;

  preguntas = [];
  preguntaActual;
  idPreguntaActual: number;
  preguntasTotales: number;
  intervalo;
  intervalo2;
  termino: boolean = false;
  terminoTodo: boolean = false;
  posicion;

  tiempo: number;
  tiempoTranscurrido: number = this.tiempo;
  ctaRegre: number = 5;

  respuestas;
  preguntaRespondida: boolean = false;
  respuestaCorrecta: boolean = false;
  respuestaElegida;

  juego;

  // Check si el jugador fue expulsado o no de la sala.
  expulsado: boolean = false;

  configuracion;

  // colores = ['#007aff' , '#28a745' , '#dc3545' , '#ffc107'];
  colores = ['#d2d2d2' , '#d2d2d2' , '#d2d2d2' , '#d2d2d2'];

  constructor(
    private webSocket: WebsocketService,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private domSanitizer: DomSanitizer
  ) {
    this.jugadorForm = this.formBuilder.group({
      nombre: ''
    });
    document.body.style.background = 'background: linear-gradient(-135deg,#c850c0,#4158d0)';
  }

  ngOnInit() {
    this.webSocket.listen('terminoTodo').subscribe(() => {
      this.api.getJugadores().subscribe(
        (res) => {
          res.forEach((jugador,index) => {
            if(this.idJugador == jugador.idJugador)
              this.posicion = index + 1; // Le sumo 1 porque el index empieza en cero.
          });
        }
      )
      this.terminoTodo = true;
    })
    window.onbeforeunload = function() { return "Your work will be lost."; };
    this.webSocket.listen('alerta').subscribe((data) => {
      this.alerta = true;
    })
    this.webSocket.listen('cambioConfiguracion').subscribe(
      () => {this.ngOnInit()}
    )
    this.webSocket.listen('expulsado').subscribe(() => {
      this.expulsado = true;
    })
    this.webSocket.listen('devolverID').subscribe((idJugador) => {
      this.idJugador = idJugador;
    })
    this.api.getConfiguracion().subscribe(
      (res) => {
        this.configuracion = res[0];
        let TYPED_ARRAY = new Uint8Array(this.configuracion.imagenPresentacion.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {return data + String.fromCharCode(byte);}, '');
        let base64String = btoa(STRING_CHAR);

        this.configuracion.imagenPresentacion = base64String;
        this.configuracion.imagenPresentacion = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
        this.tiempo = this.configuracion.tiempoPregunta;
      }
    )

    this.webSocket.listen('inicioJuego').subscribe((juego) => {
      this.juego = juego;
      // Si el jugador ya esta dentro de la sala entonces cargo todas las preguntas
      if(this.entroASala) {
        console.log(this.idJugador);
        this.api.updateJugador({idJugador: this.idJugador, jugando: juego.idJuego, preguntaActual: 1, puntaje: 0, nombre: this.nombreJugador}).subscribe(
          (res) => {console.log(res)},
          (err) => {console.log(err)}
        );
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
        });
        
        this.countdown();

      }

    });

  }
  // Cuando se hace click en alguna respuesta se llama a esta funcion.
  // Entra por parametro si la respuesta elegida es correcta o no.
  responderPregunta(correcta, idRespuesta) {
    this.preguntaRespondida = true;
    this.respuestaElegida = idRespuesta;
    clearInterval(this.intervalo);

    if(correcta == 1){
      this.respuestaCorrecta = true;
      this.puntaje += 10 + this.tiempoTranscurrido;
    }
    this.api.updateJugador({
      idJugador: this.idJugador,
      puntaje: this.puntaje,
      preguntaActual: this.preguntaActual+1
    }).subscribe((res) => {
      console.log(res)
    });

    setTimeout(()=>{
        this.siguientePregunta();
    },1000);



  }

  // Empieza el tiempo
  volver() {
    location.reload(true);
  }

  // Cuenta Regresiva
  countdown() {
    this.intervalo2 = setInterval(() => {
      if(this.ctaRegre > 0) {
        this.ctaRegre--;
      } else {
          this.ctaRegre = 0;
          clearInterval(this.intervalo2);
          this.empezarTiempo();
      }
    },1000);
  }

  // Empieza el tiempo
  empezarTiempo() {
    clearInterval(this.intervalo);
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
    let data = {
      idJugador: this.idJugador,
      nombre: this.nombreJugador,
      jugando: 0,
      puntaje: 0,
      preguntaActual: 0
    }
    this.api.updateJugador(data).subscribe();
  }

  // Pasa a la siguiente pregunta
  siguientePregunta() {
    this.idPreguntaActual++;
    let data = {
      idJugador: this.idJugador,
      nombre: this.nombreJugador,
      jugando: this.juego.idJuego,
      preguntaActual: 0,
      puntaje: this.puntaje
    };
    if(this.idPreguntaActual == this.preguntasTotales) {
      this.termino = true;
      data.jugando = -1;
    } else {
      data.preguntaActual = this.idPreguntaActual+1;
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
    this.api.updateJugador(data).subscribe();

  }

}
