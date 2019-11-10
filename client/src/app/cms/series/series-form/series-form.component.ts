import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder } from '@angular/forms';

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
  imagen: String; // Guarde la imagen en base64
  url;

  constructor(private api: ApiService, private snackBar: MatSnackBar) {
  }

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
    this.pregunta.imagen = this.pregunta.url.substring(22);
    this.api.updatePregunta(this.pregunta).subscribe(
      (res) => {},
      () => {
        this.refrescar();
        this.snackBar.open('Se guardo correctamente' , 'Pregunta' , {duration: 2500})
      }
    );
  }

  nuevaPregunta() {
    this.api.insertPregunta({
      pregunta: this.pregunta.pregunta,
      idJuego: this.idJuego
    }).subscribe(
      res => {},
      err => {
        this.refrescar();
        this.snackBar.open('Se creo satisfactoriamente' , 'Pregunta' , {duration: 2500})
      }
    );
  }

  refrescar() {
    this.cambio.emit(this.pregunta);
  }

  onUpload(event) {
    this.pregunta.imagen = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.pregunta.imagen);
    reader.onload = () => {
      this.pregunta.url = reader.result;
    };
  }
}
