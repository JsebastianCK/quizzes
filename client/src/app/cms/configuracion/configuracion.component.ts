import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  configuracion: any;

  constructor(private api: ApiService, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.configuracion = this.fb.group([{
      titulo: ['', Validators.required],
      tiempoPregunta: ['', Validators.required],
      mensajeBienvenida: ['', Validators.required]
    }]);
  }

  ngOnInit() {

    this.api.getConfiguracion().subscribe(
      (res) => {this.configuracion = res[0]},
      (err) => {},
      () => {
        console.log(this.configuracion)
      }
    )
  }

  guardarConfiguracion() {
    this.api.updateConfiguracion(this.configuracion).subscribe(
      (res) => {console.log(res)},
      (err) => {},
      () => {
        this.snackBar.open('Se guardo correctamente la configuracion!','' ,{
          duration: 2500
        })
      }
    )
  }

}
