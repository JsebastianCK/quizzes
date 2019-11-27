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
  fondoJuego;

  jugadores;

  terminoPartida: boolean = false;

  constructor(private webSocket: WebsocketService, private api: ApiService,) { }

  ngOnInit() {

    this.api.getConfiguracion().subscribe(
      (res) => {
        this.fondoJuego = res[0].fondoJuego;
      }
    )

    this.api.getJugadores().subscribe((jugadores) => {
      this.jugadores = jugadores;
      this.jugadores.sort((a,b) => {
        if(a.puntaje < b.puntaje)
        return 1
        if(a.puntaje > b.puntaje)
        return -1
        return 0;
      });
    })
    this.webSocket.listen('terminoTodo').subscribe(
      (res) => {
        this.terminoPartida = true;
      }
    )
    this.webSocket.listen('entrarSala').subscribe((data) => {
      this.jugadores.push(data);
      this.jugadores.sort((a,b) => {
        if(a.puntaje < b.puntaje)
        return 1
        if(a.puntaje > b.puntaje)
        return -1
        return 0;
      });
    });

    this.webSocket.listen('pasoPregunta').subscribe((data) => {
      this.api.getJugadores().subscribe((jugadores) => {
        this.jugadores = jugadores;
        // this.terminoPartida = this.checkFinPartida();

        // if(this.terminoPartida)
        //   this.webSocket.send('terminoTodo');
      })
    })
    
    // window.setInterval(() => {
    //   if(this.jugadores.length > 0) {
    //     this.terminoPartida = this.checkFinPartida();
    //     if(this.terminoPartida)
    //         this.webSocket.send('terminoTodo');
    //   }
    // }, 1000);

    this.webSocket.listen('salirSala').subscribe((idJugador) => {
      // Busco el jugador que se fue por ID y lo elimino de la lista.
      this.jugadores.splice(this.jugadores.findIndex(j => j.idJugador == idJugador), 1);
    })
    
    // Evento que se dispara cuando un juego fue inicializado
    this.webSocket.listen('inicioJuego').subscribe((idJuego) => {
      this.inicioJuego = true;
    })

  }

  // checkFinPartida() {
  //   // Chequeo que todos los jugadores hayan terminado de jugar para anunciar al ganador final
  //   let terminaron = true;
  //   this.jugadores.forEach(jugador => {
  //     if(jugador.jugando != -1)
  //       terminaron = false;
  //   });
  //   return terminaron;
  // }

}
