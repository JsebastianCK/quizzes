import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import * as io from 'socket.io-client';
import { WebsocketService } from '../websocket.service';
import { ApiService } from '../api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})

export class CmsComponent implements OnInit {
  mensaje: string;
  jugadores = [];
  configuracion:any;
  
  

  constructor(private webSocket: WebsocketService, private api: ApiService, public router: Router, private domSanitizer: DomSanitizer) { 
    
  }

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
    this.api.getConfiguracion().subscribe(
      (res) => {
        this.configuracion = res[0];
        let TYPED_ARRAY = new Uint8Array(this.configuracion.imagenPresentacion.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {return data + String.fromCharCode(byte);}, '');
        let base64String = btoa(STRING_CHAR);
  
        this.configuracion.imagenPresentacion = base64String;
        this.configuracion.imagenPresentacion = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
        
      }
    )
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
