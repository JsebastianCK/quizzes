import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-respuesta-form',
  templateUrl: './respuesta-form.component.html',
  styleUrls: ['./respuesta-form.component.scss']
})
export class RespuestaFormComponent implements OnInit {

  @Input()
  respuestas;

  cantidadMaximaRespuestas: boolean;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.cantidadMaximaRespuestas = (this.respuestas.length == 4);
  }

  esCorrecta(respuesta) {
    return respuesta.correcta == 1;
  }

  checkRespuesta(respuesta) {
    this.api.updateRespuesta({
      idRespuesta: respuesta.idRespuesta,
      respuesta: respuesta.respuesta,
      correcta: (respuesta.correcta == 1) ? 0 : 1
    }).subscribe((res) => {
      console.log(res);
    });
  }

  agregarRespuesta() {
    this.respuestas.push({
      idRespuesta: null,
      respuesta: '',
      correcta: 0
    });
  }
}
