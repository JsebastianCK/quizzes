import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  jugadores;
  fondoJuego;

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

    this.webSocket.listen('salirSala').subscribe((idJugador) => {
      // Busco el jugador que se fue por ID y lo elimino de la lista.
      this.jugadores.splice(this.jugadores.findIndex(j => j.idJugador == idJugador), 1);
    });
  }

  

  expulsarJugador(jugador) {
    this.webSocket.send('expulsarJugador' , jugador);
    this.ngOnInit();
  }

  finalizarPartida() {
    this.webSocket.send('terminoTodo');
  }

}
