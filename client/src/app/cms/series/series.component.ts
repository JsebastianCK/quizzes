import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { WebsocketService } from '../../websocket.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SeriesCreateComponent } from './series-create/series-create.component';
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // Opciones de MatTable
  displayedColumns: string[] = ['jugar' , 'descripcion' , 'cantPreguntas', 'acciones'];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  juegos;

  dataSourceArray = [];
  dataSource;

  nuevaSerie;

  constructor(private api: ApiService, private webSocket: WebsocketService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.api.getJuegos().subscribe((juegos) => {
      this.dataSource = new MatTableDataSource(juegos);
      this.dataSource.paginator = this.paginator;
    })
  }

  iniciarJuego(juego) {
    this.webSocket.send('iniciarJuego' , juego);
    window.open('/cms/info', '_blank');
  }

  aplicarFiltro(filtro) {
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(SeriesCreateComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.descripcion != null) {
        let idRedirect;
        this.api.createJuego(result).subscribe(
          (res) => { idRedirect = res.insertId},
          (err) => {},
          () => {
            this.router.navigate(['/cms/juego' , idRedirect])
          }
        );
      }
    });
  }

  eliminarSerie(juego) {
    if(confirm(`Seguro que desea eliminar '${juego.descripcion}'?`)) {
      let preguntasDentro = [];
      this.api.getPreguntasPorJuego(juego.idJuego).subscribe(
        preguntas => { preguntasDentro = preguntas},
        err => {console.log(err)}
      )
      this.api.deleteJuego(juego.idJuego).subscribe(
        res => {},
        err => {this.ngOnInit()},
      );
    }
  }
}
