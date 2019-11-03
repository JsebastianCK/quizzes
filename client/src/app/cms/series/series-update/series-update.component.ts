import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../api.service';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-series-update',
  templateUrl: './series-update.component.html',
  styleUrls: ['./series-update.component.scss'],
})
export class SeriesUpdateComponent implements OnInit {

  // Muestra las dos cajas para agregar/editar preguntas y respuestas.
  mostrarCajas: boolean = false;

  // ID del Juego (Viene por parametro en la url)
  idJuego: number;

  juego;

  // Datos de la tabla
  dataSource;
  displayedColumns: string[] = ['pregunta' , 'acciones'];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // ID de Pregunta a editar
  pregunta;
  idPregunta: number;
  nuevaPregunta: boolean = false;
  respuestas;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.idJuego = parseInt(this.route.snapshot.paramMap.get("idJuego"));
    
    this.api.getJuego(this.idJuego).subscribe((data) => {
      this.juego = data;
    });
    
    this.api.getPreguntasPorJuego(this.idJuego).subscribe((preguntas) => {
      this.dataSource = new MatTableDataSource(preguntas);
    })

  }

  agregarPregunta() {
    this.mostrarForms();

    // Reseteo la pregunta y las respuestas
    this.pregunta = {
      idPregunta: null,
      pregunta: ''
    };
    this.respuestas = [];

    // Es una nueva pregunta
    this.nuevaPregunta = true;
  }

  editarPregunta(idPregunta) {
    this.mostrarForms();

    // No es una nueva pregunta
    this.nuevaPregunta = false;

    // Traigo los datos de la pregunta
    this.api.getPregunta(idPregunta).subscribe(pregunta => {
      this.pregunta = pregunta;
    });
    this.api.getRespuestasPorPregunta(idPregunta).subscribe(respuestas => {
      this.respuestas = respuestas;
    })
  }

  eliminarPregunta(idPregunta) {
    if(confirm('Esta seguro que desea eliminar esta pregunta?'))
      alert('Se elimino la pregunta');
  }

  aplicarFiltro(filtro) {
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  private mostrarForms() {
    if(!this.mostrarCajas)
      this.mostrarCajas = true;
  }

  // Refresca la tabla a partir del evento del hijo
  refrescar(pregunta) {
    alert(pregunta);
    this.api.getPreguntasPorJuego(this.idJuego).subscribe((preguntas) => {
      this.dataSource = new MatTableDataSource(preguntas);
    })
  }
}
