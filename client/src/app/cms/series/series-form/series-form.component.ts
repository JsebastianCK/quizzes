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
  pregunta;

  @Input()
  nueva;

  @Output() cambio = new EventEmitter();

  cambioAlgo: boolean = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    
  }

  guardarPregunta() {
    if(this.nueva) {
      this.nuevaPregunta();
    } else {
      this.actualizarPregunta();
    }
    this.refrescar();
  }

  actualizarPregunta() {
    this.api.updatePregunta({
      idPregunta: this.pregunta.idPregunta,
      pregunta: this.pregunta.pregunta
    }).subscribe((res) => {
      alert('adentro del subscribe');
    });
  }

  nuevaPregunta() {
    alert('eta e nueva');
  }

  refrescar() {
    this.cambio.emit(this.pregunta);
  }
}
