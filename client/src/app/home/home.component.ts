import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WebsocketService } from '../websocket.service';

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

  constructor(
    private webSocket: WebsocketService,
    private formBuilder: FormBuilder
  ) {
    this.jugadorForm = this.formBuilder.group({
      name: ''
    });
  }

  ngOnInit() {
    this.webSocket.listen('alerta').subscribe((data) => {
      this.alerta = true;
    })
  }

  entrarSala(jugador) {
    // La persona entra a la sala.
    this.webSocket.send('entrarSala' , jugador.name);
    this.nombreJugador = jugador.name;
    this.entroASala = true;
  }

}
