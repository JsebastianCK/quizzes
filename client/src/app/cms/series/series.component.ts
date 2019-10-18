import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { WebsocketService } from '../../websocket.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  juegos;

  constructor(private api: ApiService, private webSocket: WebsocketService) { }

  ngOnInit() {
    this.juegos = this.api.getJuegos();
  }

  iniciarJuego(idJuego) {
    this.webSocket.send('iniciarJuego' , idJuego);
  }

}
