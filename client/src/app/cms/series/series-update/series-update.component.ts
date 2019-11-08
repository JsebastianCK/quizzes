import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../api.service';
import {MatTableDataSource} from '@angular/material/table';
import { SeriesFormComponent } from '../series-form/series-form.component';
import { MatDialog } from '@angular/material/dialog';


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
  pageSize = 4;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // ID de Pregunta a editar
  pregunta;
  idPregunta: number;
  nuevaPregunta: boolean = false;
  respuestas;

  constructor(private route: ActivatedRoute, private api: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.idJuego = parseInt(this.route.snapshot.paramMap.get("idJuego"));
    
    this.api.getJuego(this.idJuego).subscribe((data) => {
      this.juego = data;
    });
    
    this.api.getPreguntasPorJuego(this.idJuego).subscribe((preguntas) => {
      this.dataSource = new MatTableDataSource(preguntas);
    })

    this.pregunta = {
      pregunta: ''
    }
  }

  agregarPregunta() {
    this.pregunta = {
      pregunta: ''
    };
    this.nuevaPregunta = true;
    this.mostrarForms();
  }

  editarPregunta(idPregunta) {
    this.mostrarForms();
    this.respuestas = [];
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
      this.api.deletePregunta(idPregunta).subscribe(
        () => {this.ngOnInit()}
      )
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
    this.api.getPreguntasPorJuego(this.idJuego).subscribe((preguntas) => {
      this.dataSource = new MatTableDataSource(preguntas);
    })
  }
}
