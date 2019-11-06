import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-series-form',
  templateUrl: './series-form.component.html',
  styleUrls: ['./series-form.component.scss']
})
export class SeriesFormComponent implements OnInit {
  
  @Input()
  idJuego: number;

  @Input()
  pregunta;

  @Input()
  nueva;

  @Output() cambio = new EventEmitter();

  cambioAlgo: boolean = true;
  imagen: File = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
    
  }

  guardarPregunta() {
    if(this.nueva) {
      this.nuevaPregunta();
    } else {
      this.actualizarPregunta();
    }
  }

  actualizarPregunta() {
    this.api.updatePregunta({
      idPregunta: this.pregunta.idPregunta,
      pregunta: this.pregunta.pregunta
    }).subscribe(
      (res) => {},
      () => {this.refrescar()}
    );
  }

  nuevaPregunta() {
    this.api.createPregunta({
      pregunta: this.pregunta.pregunta,
    }).subscribe(
      res => {
        let idPregunta = res.insertId;
        let data = {
          idPregunta: idPregunta, 
          idJuego: this.idJuego
        };
        this.api.insertPregunta(data).subscribe(
          () => {this.refrescar()},
          () => {}
        );
      },
    );
  }

  refrescar() {
    this.cambio.emit(this.pregunta);
  }
}
