import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-series-create',
  templateUrl: './series-create.component.html',
  styleUrls: ['./series-create.component.scss']
})
export class SeriesCreateComponent implements OnInit {

  // Muestra las dos cajas para agregar/editar preguntas y respuestas.
  mostrarCajas: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
