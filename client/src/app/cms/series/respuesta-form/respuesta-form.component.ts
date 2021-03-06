import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-respuesta-form',
  templateUrl: './respuesta-form.component.html',
  styleUrls: ['./respuesta-form.component.scss']
})
export class RespuestaFormComponent implements OnInit {

  @Input()
  respuestas;

  @Input()
  idPregunta;

  cantidadMaximaRespuestas: boolean;

  constructor(private api: ApiService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.cantidadMaximaRespuestas = (this.respuestas.length == 4);
  }

  esCorrecta(respuesta) {
    return respuesta.correcta == 1;
  }

  checkRespuesta(respuesta) {
    this.api.updateRespuestaCorrecta({
      idRespuesta: respuesta.idRespuesta,
      respuesta: respuesta.respuesta,
      correcta: (respuesta.correcta == 1) ? 0 : 1
    }).subscribe((res) => {
      console.log(res);
    });
  }

  agregarRespuesta() {
    let nuevaRespuesta = {
      idRespuesta: null,
      idPregunta: this.idPregunta,
      respuesta: '',
      correcta: 0
    }
    this.guardarNueva(nuevaRespuesta);
    this.respuestas.push(nuevaRespuesta);
  }

  eliminarRespuesta(respuesta) {
    this.api.deleteRespuesta(respuesta.idRespuesta).subscribe(
      () => {},
      () => {this.respuestas = this.respuestas.filter(obj => obj !== respuesta);}
    )
  }

  guardarRespuestas() {
    this.respuestas.forEach(element => {
      this.actualizarRespuesta(element);
    });
    this.snackBar.open('Se guardo correctamente' , 'Respuesta' , {duration: 2500})
  }

  guardarNueva(respuesta) {
    this.api.insertRespuesta(respuesta).subscribe(
      (res) => {respuesta.idRespuesta = res.insertId;console.log(res)},
      (err) => {},
    )
  }

  actualizarRespuesta(respuesta) {
    this.api.updateRespuesta(respuesta).subscribe(
      () => {},
      () => {},
      () => {}
    )
  }
}
