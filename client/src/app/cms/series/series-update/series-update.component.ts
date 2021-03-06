import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../api.service';
import {MatTableDataSource} from '@angular/material/table';
import { SeriesFormComponent } from '../series-form/series-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-series-update',
  templateUrl: './series-update.component.html',
  styleUrls: ['./series-update.component.scss'],
})
export class SeriesUpdateComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  // Muestra las dos cajas para agregar/editar preguntas y respuestas.
  mostrarCajas: boolean = false;

  // ID del Juego (Viene por parametro en la url)
  idJuego: number;

  juego;

  // Datos de la tabla
  dataSource;
  displayedColumns: string[] = ['pregunta' , 'acciones'];

  // ID de Pregunta a editar
  pregunta;
  idPregunta: number;
  nuevaPregunta: boolean = false;
  respuestas;

  constructor(private route: ActivatedRoute, private api: ApiService, public dialog: MatDialog, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.idJuego = parseInt(this.route.snapshot.paramMap.get("idJuego"));
    
    this.api.getJuego(this.idJuego).subscribe((data) => {
      this.juego = data[0];
    });
    
    this.api.getPreguntasPorJuego(this.idJuego).subscribe((preguntas) => {
      this.dataSource = new MatTableDataSource(preguntas);
      this.dataSource.paginator = this.paginator;
    })
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
      
      let TYPED_ARRAY = new Uint8Array(this.pregunta.imagen.data);
      const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {return data + String.fromCharCode(byte);}, '');
      let base64String = btoa(STRING_CHAR);

      this.pregunta.imagen = base64String;
      let url = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
      this.pregunta.url = url;
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
    this.ngOnInit();
  }
}
