import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-respuesta-form',
  templateUrl: './respuesta-form.component.html',
  styleUrls: ['./respuesta-form.component.scss']
})
export class RespuestaFormComponent implements OnInit {

  @Input()
  respuestas;

  constructor() { }

  ngOnInit() {
  }

}
