import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { WebsocketService } from '../../websocket.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  // Opciones de MatTable
  displayedColumns: string[] = ['jugar' , 'descripcion' , 'cantPreguntas', 'acciones'];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  juegos;

  dataSourceArray = [];
  dataSource;

  constructor(private api: ApiService, private webSocket: WebsocketService) { }

  ngOnInit() {
    this.api.getJuegos().subscribe((juegos) => {
      this.dataSource = new MatTableDataSource(juegos);
    })
  }

  iniciarJuego(idJuego) {
    this.webSocket.send('iniciarJuego' , idJuego);
  }

  aplicarFiltro(filtro) {
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

}
