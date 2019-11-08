import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-series-create',
  templateUrl: './series-create.component.html',
  styleUrls: ['./series-create.component.scss']
})
export class SeriesCreateComponent implements OnInit {

  juego: Object = {
    descripcion: null
  };

  constructor() { }

  ngOnInit() {
  }

  crearJuego() {
    
  }

}
